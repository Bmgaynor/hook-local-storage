import { renderHook, act } from '@testing-library/react-hooks'
import useLocalStorage from './use-local-storage'

beforeEach(() => {
    window.localStorage.clear()
})

test('returns initialValue when nothing is stored yet', () => {
    const { result } = renderHook(() => useLocalStorage('missing-key', 'default'))
    expect(result.current[0]).toBe('default')
})

test('setValue updates state and persists to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0))

    act(() => {
        result.current[1](5)
    })

    expect(result.current[0]).toBe(5)
    expect(JSON.parse(window.localStorage.getItem('count'))).toBe(5)
})

test('reads an existing value from localStorage on mount', () => {
    window.localStorage.setItem('existing', JSON.stringify({ a: 1 }))

    const { result } = renderHook(() => useLocalStorage('existing', null))

    expect(result.current[0]).toEqual({ a: 1 })
})

test('falls back to initialValue when stored data is malformed JSON', () => {
    window.localStorage.setItem('broken', 'not-json{')

    const { result } = renderHook(() => useLocalStorage('broken', 'fallback'))

    expect(result.current[0]).toBe('fallback')
})
