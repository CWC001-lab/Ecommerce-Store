# Email Setup Instructions

**IMPORTANT**: Email functionality is now centralized in the **admin app only**. You only need to set up email configuration in the admin app.

## Admin App Setup

Set up the following environment variables in your **admin app's** `.env.local` file:

```env
# Email Configuration (Admin App Only)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@fashionbyoreoluwa.com

# Database
DIRECT_URL=postgresql://FBO-Admin-Panel_owner:zTQ6MYlEbre2@ep-quiet-frost-a5qruv32.us-east-2.aws.neon.tech/FBO-Admin-Panel?sslmode=require
```

## Store App Setup

Set up the following environment variables in your **store app's** `.env.local` file:

```env
# Database
DIRECT_URL=postgresql://FBO-Admin-Panel_owner:zTQ6MYlEbre2@ep-quiet-frost-a5qruv32.us-east-2.aws.neon.tech/FBO-Admin-Panel?sslmode=require

# Admin App URL (for email API calls)
ADMIN_EMAIL_URL=http://localhost:3000
```

## Gmail Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password (not your regular Gmail password) for `EMAIL_PASSWORD`

## How It Works

1. **Store App**: Handles receipt uploads and stores data in database
2. **Store App**: Calls admin app's email API (`/api/email`) to send notifications
3. **Admin App**: Centralized email service sends both admin and customer emails

## Email Notifications

When a customer uploads a receipt:
1. **Store App**: Uploads receipt and calls admin email API
2. **Admin App**: Sends admin notification email
3. **Admin App**: Sends customer confirmation email

## Troubleshooting

- If emails are not being sent, check both apps' console logs
- Ensure admin app has email environment variables configured
- Ensure store app has `ADMIN_EMAIL_URL` pointing to admin app
- Verify the Gmail app password is correct
- Check that the email addresses are valid

