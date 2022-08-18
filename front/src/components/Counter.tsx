import React, { useState } from 'react';
import Button from './Button';

function Counter_() {
  const [count, setCount] = useState(0);
  return <Button onClick={() => setCount((old) => old + 1)}>{count}</Button>;
}

function Counter() {
  return (
    <>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Remember me</span>
          <input type="checkbox" className="checkbox" />
        </label>
      </div>
      <Counter_ />
    </>
  );
}

export default Counter;
