import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { TokenInterceptor } from './token.interceptor';

export const services: any[] = [AuthInterceptor, TokenInterceptor];

export * from '../interceptors/auth.interceptor';
export * from './token.interceptor';
