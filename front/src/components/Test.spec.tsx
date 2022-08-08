import React from 'react';
import { screen, render } from '@testing-library/react';

function Test({ n }: { n: number }){
  return <div>{n+n}</div>
}

describe('Test', () => {
  it('add', () => {
    expect(1+1).toBe(2);
  })

  it('render', () => {
    render(<Test n={3} />);

    screen.getByText("5");
  })
})
