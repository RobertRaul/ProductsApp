import { create } from "zustand";
import { User } from "../../../../domain/entities/user";
import { AuthStatus } from "../../../../infraestructure/interfaces/auth.status";
import { authCheckStatus, authLogin, authRegisterUser } from "../../../../actions/auth/auth";
import { MyStorageAdapter } from "../../../../config/adapters/storage-adapter";


export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;
    login: (email: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string, fullName: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'cheking',
    token: undefined,
    user: undefined,
    login: async (email: string, password: string) => {
        const response = await authLogin(email, password);
        if (!response) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            return false;
        }
        console.log(response)
        //TODO: save token and user in storage
        await MyStorageAdapter.setItemAdapter('token', response.token)

        //const storeToken = await MyStorageAdapter.getItemAdapter('token')
        //console.log({storeToken})

        set({ status: 'authenticated', token: response.token, user: response.user });

        return true;
    },


    checkStatus: async () => {
        const response = await authCheckStatus();
        if (!response) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            return;
        }

        await MyStorageAdapter.setItemAdapter('token', response.token)
        set({ status: 'authenticated', token: response.token, user: response.user });
    },

    logout: async () => {
        await MyStorageAdapter.removeItemAdapter('token')
        set({ status: 'unauthenticated', token: undefined, user: undefined });
        console.log('LOGOOUT')
    },

    register: async (email: string, password: string, fullName: string) => {
        const response = await authRegisterUser(email, password, fullName);
        if (!response) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            return false;
        }
        console.log(response)
        set({ status: 'authenticated', token: response.token, user: response.user });
        return true;
    }
}));
