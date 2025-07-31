import { create } from "zustand"
import axios from "axios"

const app = axios.create({
    baseURL: "http://localhost:800",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

const URL_ENDPOINT = "http://localhost:800/v1"
// axios.defaults.withCredentials = true
export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckigAuth: true,
    signup: async (object) => {
        set({ isLoading: true, error: null })
        try {
            const response = await app.post(`${URL_ENDPOINT}/auth/signup`, object, {

            })
            if (response.data.status === 501) {
                set({ error: response.data.message, isLoading: false })
            }
            set({ user: response.data, isLoading: false })

        } catch (error) {
            set({ error: error.message || "erro signing user", isLoading: false })
            throw error
        }
    },
    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const test = await app.get(`${URL_ENDPOINT}/user`)
            console.log(test.data)
            const response = await app.post(`${URL_ENDPOINT}/verification/verify_email`, { code })
            console.log(response.data)
            if (response.data.status != 200) {
                console.log(response.data)
                set({ isLoading: false, error: response.data.message || "an erro have occured", user: response.data.data, isAuthenticated: false, isLoading: true, });
            }
            set({ user: response.data.data, isAuthenticated: true, message: response.data.message, isLoading: true, });
            return response.data
        } catch (error) {
            set({ error: error.message || "an erro have occured", isLoading: false, });
            throw error
        }
    }
}))