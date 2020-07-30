import { createAction } from '@ngrx/store';

export const hideSpinner = createAction('[LoadingInterceptor] Hide Spinner');
export const showSpinner = createAction('[LoadingInterceptor] Show Spinner');
