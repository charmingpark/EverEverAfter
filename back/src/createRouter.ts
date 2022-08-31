import { router } from '@trpc/server';
import type { ContextT } from './createContext';

export function createRouter(){
  return router<ContextT>()
}