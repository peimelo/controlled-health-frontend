export interface Credentials {
  email: string;
  password: string;
}

export interface PasswordCombination {
  currentPassword?: string;
  password: string;
  passwordConfirmation: string;
}

export interface User {
  email: string;
  name: string;
}
