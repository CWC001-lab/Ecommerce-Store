"use client"
import { useState, useEffect } from 'react';

const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0, // Nigerian Naira typically doesn't use decimal places
    maximumFractionDigits: 0
})

interface CurrencyProps {
    value?: string | number;
}

const Currency:React.FC<CurrencyProps> = ({ value }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }

    return ( 
        <div className="font-semibold">
            {formatter.format(Number(value))}
        </div>
    );
}

export default Currency;