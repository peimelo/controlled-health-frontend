export interface Credentials {
  email: string;
  password: string;
}

export interface PasswordCombination {
  password: string;
  passwordConfirmation: string;
}

export interface User {
  email: string;
  name: string;
}

export interface SuccessResponse {
  success: boolean;
  message: string;
}
