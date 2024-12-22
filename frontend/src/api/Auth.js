import axios from "axios"

const Api_Url = "http://127.0.0.1:8000/auth/"

export const RegisterUser = async (username, password) => {
    try {
        const response = await axios.post(`${Api_Url}`, {
            username,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const LoginUser = async (username, password) => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);
    return axios.post(`${Api_Url}token`, formData);
}