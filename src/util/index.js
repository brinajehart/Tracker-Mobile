import { useEffect, useState } from 'react'
import { Image } from 'react-native';

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

export function fromCurrencyToEuro(amount, currency="EUR") {
    const convertedAmount = amount * (1 / CURRENCY_CONVERSIONS[currency]);
    return convertedAmount;
}

export function convertAmount(amount, currency="EUR") {
    const convertedAmount = amount * CURRENCY_CONVERSIONS[currency];
    return convertedAmount / 100;
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

export function useImageAspectRatio(imageUrl) {
    const [aspectRatio, setAspectRatio] = useState(1);
  
    useEffect(() => {
      if (!imageUrl || !imageUrl.includes('data:image')) {
        return;
      }
  
      let isValid = true;
      Image.getSize(imageUrl, (width, height) => {
        if (isValid) {
          setAspectRatio(width / height);
        }
      });
  
      return () => {
        isValid = false;
      };
    }, [imageUrl]);
  
    return aspectRatio;
  }