import { useState } from 'react'


const getInitialValue = (initialValue, key) => {
    if (typeof window === 'undefined') {
        return initialValue
    }
    const value = window.localStorage.getItem(key)
    if (value === undefined || value === null) {
        return initialValue
    }
    try {
        return JSON.parse(value)
    } catch (e) {
        return initialValue
    }
}

const setItem = (key, newValue) => {
    if (typeof window === 'undefined') {
        return
    }
    try {
        window.localStorage.setItem(key, JSON.stringify(newValue))
    } catch (e) {
        // localStorage can throw (Safari private browsing, quota exceeded, etc.) -
        // state below still updates even if persisting fails.
    }
}

export default (key, initialValue) => {
    const [value, setValue] = useState(() => getInitialValue(initialValue, key))
    return [value, (newValue) => {
        setValue(newValue)
        setItem(key, newValue)
    }]
}
