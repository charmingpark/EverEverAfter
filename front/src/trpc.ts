import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '../../back/src/router';

export const trpc = createReactQueryHooks<AppRouter>();