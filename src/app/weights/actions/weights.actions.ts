import { createAction, props } from '@ngrx/store';
import { Weight } from '../models';

/**
 * Create Weight Actions
 */
export const createWeight = createAction(
  '[Weights] Create Weight',
  props<{ weight: Weight }>()
);

export const createWeightFailure = createAction(
  '[Weights] Create Weight Failure',
  props<{ error: any }>()
);

export const createWeightSuccess = createAction(
  '[Weights] Create Weight Success',
  props<{ response: any }>()
);

/**
 * Delete Weight Actions
 */
export const deleteWeight = createAction(
  '[Weights] Delete Weight',
  props<{ id: number }>()
);

export const deleteWeightFailure = createAction(
  '[Weights] Delete Weight Failure',
  props<{ error: any }>()
);

export const deleteWeightSuccess = createAction(
  '[Weights] Delete Weight Success',
  props<{ response: any }>()
);

/**
 * Load Weight Actions
 */
// export const loadWeight = createAction(
//   '[Weights] Load Weight',
//   props<{ id: number }>()
// );

// export const loadWeightFailure = createAction(
//   '[Weights] Load Weight Failure',
//   props<{ error: any }>()
// );

// export const loadWeightSuccess = createAction(
//   '[Weights] Load Weight Success',
//   props<{ weight: Weight }>()
// );

/**
 * Open Weight Form Dialog
 */
export const weightFormDialogDismiss = createAction(
  '[Weights] Weight Form Dialog Dismiss'
);

export const weightFormDialogOpen = createAction(
  '[Weights Page] Weight Form Dialog Open',
  props<{ weight?: Weight }>()
);

/**
 * Update Weight Actions
 */
export const updateWeight = createAction(
  '[Weights] Update Weight',
  props<{ weight: Weight }>()
);

export const updateWeightFailure = createAction(
  '[Weights] Update Weight Failure',
  props<{ error: any }>()
);

export const updateWeightSuccess = createAction(
  '[Weights] Update Weight Success',
  props<{ response: any }>()
);
