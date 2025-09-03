import React from 'react'

const Counter = () => {
    const [count, setCounter] = React.useState(0);
    return (
        <div>
            <p>This is a Counter, count = {count}</p>
            <button onClick={() => setCounter(count + 1)}>+</button>
            <button onClick={() => setCounter(count - 1)}>-</button>
            <button onClick={() => setCounter(0)}>Refresh</button>
        </div>
    )
}

export default Counter