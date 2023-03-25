import API from "./API";
import { HttpStatusCode } from "axios";

export type SignupDataType = {
    username: string,
    email: string,
    password: string
};

export type LoginDataType = {
    username: string,
    password: string
};

export class User {
    private constructor() {
    }

    public static async createAccount(signupData: SignupDataType) {
        const response = await API.Axios.post<string>(
            '/api/v1/auth/signup',
            JSON.stringify(signupData),
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                validateStatus: status => [HttpStatusCode.Ok, HttpStatusCode.BadRequest].includes(status)
            }
        );
        if (response.status !== HttpStatusCode.Ok) {
            throw new Error(response.data);
        }
        return response.data;
    }

    public static async login(loginData: LoginDataType) {
        try {
            const response = await API.Axios.post<string>('/api/v1/auth/login', {}, {
                auth: {
                    username: loginData.username,
                    password: loginData.password
                }
            });
            return response.data;
        } catch (e) {
            throw new Error('Invalid username / password');
        }
    }
}