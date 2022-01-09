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
  id: number;
  email: string;
  name: string;
  gender: string;
  date_of_birth: string;
}
