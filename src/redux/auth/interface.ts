export interface User {
  uid: string;
}

export interface AuthState {
  isLoading: boolean;
  user: null | User;
  requestedPasswordReset: boolean;
}