import { Sort } from '@angular/material/sort';
import { createAction, props } from '@ngrx/store';
import { Reference } from '../../core/models';

export const addReference = createAction('[References Page] Add Reference');

export const deleteReference = createAction(
  '[References Page] Delete Reference',
  props<{ id: number }>()
);

export const changePageReferences = createAction(
  '[References Page] Change Page References',
  props<{ pageIndex: number }>()
);

export const editReference = createAction(
  '[References Page] Edit Reference',
  props<{ reference: Reference }>()
);

export const sortReferences = createAction(
  '[References Page] Sort References',
  props<{ sort: Sort }>()
);
