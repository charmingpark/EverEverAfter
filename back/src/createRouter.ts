import { router } from '@trpc/server';
import { ContextT } from './createContext';

export function createRouter(){
  return router<ContextT>();
}