import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

// Axios instance
const app = axios.create({
    baseURL: "http://localhost:800",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// URL constants
const URL_ENDPOINT = "http://localhost:800/v1";

// Zustand Auth Store
export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            error: null,
            isLoading: false,
            isCheckingAuth: true,

            // SIGNUP
            signup: async (object) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await app.post(`${URL_ENDPOINT}/auth/signup`, object);
                    const data = response.data;

                    if (data.status === 501) {
                        set({ error: "Something went wrong with signup", isLoading: false });
                    } else {
                        set({ user: data.data, isLoading: false, error: null });
                    }

                    return response;
                } catch (error) {
                    const errMsg = error?.response?.data?.message || "Error signing up user";
                    console.error("Signup error:", errMsg);
                    set({ error: errMsg, isLoading: false });
                    throw error;
                }
            },

            // LOGIN
            login: async (object) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await app.post(`${URL_ENDPOINT}/auth/login`, object);
                    const data = response.data;

                    set({ user: data.data, isAuthenticated: true, isLoading: false });
                    return response;
                } catch (error) {
                    const errMsg = error?.response?.data?.message || "Error logging in";
                    console.error("Login error:", errMsg);
                    set({ error: errMsg, isLoading: false });
                    throw error;
                }
            },

            // VERIFY EMAIL
            verifyEmail: async (code) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await app.post(`${URL_ENDPOINT}/verification/verify_email`, { code });

                    set({
                        isAuthenticated: true,
                        error: null,
                        isLoading: false,
                        isCheckingAuth: false,
                    });

                    return response.data;
                } catch (error) {
                    const errMsg = error?.response?.data?.message || "An error occurred during verification";
                    console.error("Verify email error:", errMsg);
                    set({ error: errMsg, isLoading: false });
                    throw error;
                }
            },

            // LOGOUT
            logout: async () => {
                set({ isCheckingAuth: true });
                try {
                    await app.post(`${URL_ENDPOINT}/auth/logout`);
                    set({
                        user: null,
                        isAuthenticated: false,
                        error: null,
                        isCheckingAuth: false,
                    });
                } catch (error) {
                    console.warn("Logout failed silently.");
                    set({ error: null, isCheckingAuth: false });
                }
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
