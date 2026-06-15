import { useState } from 'react';
import { formatCountDisplay } from '../utils/counterHelpers';

function Counter() {
    const [count, setCount] = useState(0);
    return (
        <>
        <div>
            <h2>{formatCountDisplay(count)}</h2>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
        </>
    );
}
export default Counter;