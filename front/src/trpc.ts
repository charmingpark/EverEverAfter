import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '../../back/src/index';

export const trpc = createReactQueryHooks<AppRouter>();