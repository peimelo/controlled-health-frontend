import { PasswordCombination, User } from './user.model';

export interface CreateAccountRequest extends PasswordCombination {
  email: string;
}

export interface MessageResponse {
  message: string;
}

export interface UserDataResponse {
  data: User;
}

export interface UpdateAccountResponse
  extends MessageResponse,
    UserDataResponse {}
