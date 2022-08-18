import React from 'react';
import { screen, render, waitFor, getByRole, getAllByRole } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostPage from './PostList';

describe('Test', () => {
  it('render', async () => {
    render(<PostPage />);

    await waitFor(() => {
        const items = screen.getAllByRole('listitem');

        expect(items.length).toBe(2);
        const message = getByRole(items[0], 'heading');
        expect(message).toBeInTheDocument();
        const images = getAllByRole(items[0], 'img');
        expect(images).toHaveLength(1);
    })
  })
})
