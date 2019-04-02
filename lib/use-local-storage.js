import { useState } from 'react'


const getInitalValue = (initialValue, key) => {
    const value = window.localStorage.getItem(key)
    if (value === undefined || value === null) {
        return initialValue
    } else {
        return JSON.parse(value)
    }
}

const setItem = (key, newValue) => {
    window.localStorage.setItem(key, JSON.stringify(newValue))
}

export default (key, initialValue) => {
    const [value, setValue] = useState(getInitalValue(initialValue, key))
    return [value, (newValue) => {
        setValue(newValue)
        setItem(key, newValue)
    }] 
}