import { createAction, props } from '@ngrx/store';

export const deleteAccount = createAction('[Account Page] Delete Account');
export const updateAccount = createAction(
  '[Account Page] Update Account',
  props<{ name: string }>()
);
