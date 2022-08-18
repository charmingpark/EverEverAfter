import React from 'react';

type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className?: string;
};

function Button({ onClick, children }: ButtonProps) {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
