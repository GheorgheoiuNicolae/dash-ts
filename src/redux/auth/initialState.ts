import { AuthState } from './interface';

export const authInitialState: AuthState = {
    isLoading: false,
    user: null,
    requestedPasswordReset: false,
};