import { createAction, props } from '@ngrx/store';

export const reloadHeights = createAction(
  '[Heights Effects] Reload Heights',
  props<{ pageIndex: number }>()
);

export const heightFormDialogDismiss = createAction(
  '[Heights] Height Form Dialog Dismiss'
);
