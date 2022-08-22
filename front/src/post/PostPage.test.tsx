import React from 'react';
import {
  screen,
  render,
  waitFor,
  getByRole,
  getAllByRole,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import PostPage, { queryClient } from './PostPage';
import { PostT } from '../../../back/src/posts/schema';

const user = userEvent.setup();

describe('PostList', () => {
  it('render items', async () => {
    queryClient.setQueryData('post.all', (): PostT[] => [
      {
        id: 1,
        message: 'test',
        images: [
          'https://pbs.twimg.com/profile_banners/1261543922309849088/1615648508/1500x500',
        ],
      },
      {
        id: 2,
        message: 'test2',
        images: [
          'https://pbs.twimg.com/profile_banners/1261543922309849088/1615648508/1500x500',
        ],
      },
    ]);

    render(<PostPage />);

    await waitFor(() => {
      const items = screen.getAllByRole('listitem');

      expect(items.length).toBe(2);
      const firstItem = items[0]!;
      const message = getByRole(firstItem, 'heading');
      expect(message).toBeInTheDocument();
      const images = getAllByRole(firstItem, 'img');
      expect(images).toHaveLength(1);
    });
  });

  it('create post', async () => {
    render(<PostPage />);

    const input = await screen.findByPlaceholderText(/결혼 축하해/);
    await user.type(input, '차밍아 결혼 축하한다!');
    await user.click(
      screen.getByRole('button', {
        name: '올리기',
      })
    );

    await waitFor(() => {
      const lastItem = screen.getAllByRole('listitem').at(-1)!;

      expect(lastItem).toHaveTextContent('차밍아 결혼 축하한다!');
    });
  });

  it('edit post', async () => {
    render(<PostPage />);

    const lastItem = screen.getAllByRole('listitem').at(-1)!;
    await user.click(
      getByRole(lastItem, 'button', {
        name: '수정하기',
      })
    );

    const editInput = getByRole(lastItem, 'textbox');
    await user.type(editInput, '{Backspace}❤️');

    await user.click(
      getByRole(lastItem, 'button', {
        name: '수정 완료',
      })
    );

    await waitFor(() => {
      expect(lastItem).toHaveTextContent('차밍아 결혼 축하한다❤️');
    });
  });

  it('delete post', async () => {
    render(<PostPage />);
    const lastItem = screen.getAllByRole('listitem').at(-1)!;
    const button = getByRole(lastItem, 'button', {
      name: '삭제',
    });
    window.confirm = () => true;
    await user.click(button);

    await waitFor(() => expect(lastItem).not.toBeInTheDocument());
  });
});
