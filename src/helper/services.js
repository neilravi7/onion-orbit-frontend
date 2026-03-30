const API_ROOT = import.meta.env.VITE_SERVER_URL

export const API_URL = {
    // AUTH
    signUp:() => `${API_ROOT}/auth/sign-up`,
    signIn:() => `${API_ROOT}/auth/sign-in`,
    getCustomerProfile:(user_id) => `${API_ROOT}/customer/${user_id}/profile`,
}