import { useEffect, useState } from 'react'

export function includesLower(a, b) {
    const aLower = a?.toLowerCase() ?? "";
    const bLower = b?.toLowerCase() ?? "";
    return aLower.includes(bLower);
}
export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}

const zeroPad = (num, places) => String(parseInt(Math.floor(num))).padStart(places, '0');
export const CURRENCY_CONVERSIONS = {
    'USD': 1.02,
    'EUR': 1,
    'GBP': 0.87
};

export function convertAmount(amount, currency="EUR") {
    const convertedAmount = amount * CURRENCY_CONVERSIONS[currency];
    return convertedAmount;
}

export function formatAmount(amount, currency="EUR") {
    let convertedAmount = amount, currencyPostfix = ''; 
    if (currency in CURRENCY_CONVERSIONS) {
        convertedAmount *= CURRENCY_CONVERSIONS[currency];
        currencyPostfix += ` ${currency.toLocaleUpperCase()}`; 
    }

    let amountAsString = `${parseInt(Math.floor(convertedAmount/100))},${zeroPad(convertedAmount % 100, 2)}`;
    return amountAsString + currencyPostfix;
}