## hook-local-storage

A tiny React hook for state that persists to `localStorage`. Drop-in replacement for `useState` — same `[value, setValue]` shape, but the value survives page refreshes.

Full docs & interactive examples: http://bradgaynor.com/hook-local-storage/

## Install

```bash
npm install hook-local-storage
```

## Usage

```jsx
import useLocalStorage from 'hook-local-storage'

const Counter = () => {
    const [count, setCount] = useLocalStorage('count', 0)
    return (
        <button onClick={() => setCount(count + 1)}>
            count: {count}
        </button>
    )
}
```

Works with any JSON-serializable value (objects, arrays, strings, numbers, booleans) — not just numbers.

## API

```js
const [value, setValue] = useLocalStorage(key, initialValue)
```

- `key` — the `localStorage` key to read from and write to.
- `initialValue` — used when nothing is stored yet under `key` (or when running server-side, where `localStorage` isn't available).
- `value` — the current value, read from `localStorage` on mount.
- `setValue(newValue)` — updates state and persists `newValue` to `localStorage`.
