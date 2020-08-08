import { PasswordCombination } from './user.model';

export interface CreateAccountRequest extends PasswordCombination {
  email: string;
}

export interface SuccessResponse {
  success: boolean;
  message?: string;
}
