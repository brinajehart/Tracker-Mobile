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