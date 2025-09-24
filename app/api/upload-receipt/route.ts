import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';

// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const orderId = formData.get('orderId') as string;
    const customerName = formData.get('customerName') as string;
    const customerEmail = formData.get('customerEmail') as string;
    const receiptFile = formData.get('receipt') as File;

    if (!orderId || !customerName || !customerEmail || !receiptFile) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Convert file to base64 for email attachment
    const bytes = await receiptFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Receipt = buffer.toString('base64');

    // Store receipt information in database
    try {
      await query(`
        UPDATE "Order" 
        SET "customerName" = $1, 
            "customerEmail" = $2, 
            "receiptUrl" = $3, 
            "receiptFileName" = $4, 
            "receiptUploadedAt" = NOW(),
            "isPaid" = TRUE
        WHERE id = $5
      `, [customerName, customerEmail, `data:${receiptFile.type};base64,${base64Receipt}`, receiptFile.name, orderId]);
    } catch (dbError) {
      console.error('Error storing receipt in database:', dbError);
      // Continue with email sending even if database update fails
    }

    const receiptData = {
      orderId,
      customerName,
      customerEmail,
      receiptFile: {
        name: receiptFile.name,
        size: receiptFile.size,
        type: receiptFile.type,
      },
      base64Receipt,
    };

    // Try to send emails via admin app, but don't fail the upload if email sending fails
    let emailResult = { success: false, error: 'Email service not available' };
    
    try {
      // Call admin app's email API
      const adminEmailUrl = process.env.ADMIN_EMAIL_URL || 'http://localhost:3000';
      const emailResponse = await fetch(`${adminEmailUrl}/api/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'receipt_uploaded',
          data: receiptData
        })
      });

      if (emailResponse.ok) {
        const emailData = await emailResponse.json();
        emailResult = {
          success: emailData.success,
          error: emailData.success ? '' : emailData.message || 'Unknown error'
        };
      } else {
        emailResult.error = `Email API returned ${emailResponse.status}`;
      }
    } catch (emailError) {
      console.warn('Email sending failed:', emailError);
      emailResult.error = String(emailError);
    }

    // Always return success for the receipt upload, regardless of email status
    return NextResponse.json({
      success: true,
      message: emailResult.success 
        ? 'Receipt uploaded successfully and emails sent'
        : 'Receipt uploaded successfully. Email notifications may not have been sent.',
      orderId,
      emailStatus: {
        success: emailResult.success,
        error: emailResult.error
      }
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Error processing receipt upload:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
