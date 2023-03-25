import jwtDecode from "jwt-decode";
import { LoginDataType, SignupDataType } from "./User";
import API from "./API";

type JwtTokenType = {
    sub: string,
    iss: string,
    exp: number,
    iat: number
};

class Authentication {
    public static async signUp(signupData: SignupDataType) {
        await API.User.createAccount(signupData);
        const token = await API.User.login({
                username: signupData.username,
                password: signupData.password
            } as LoginDataType);
        localStorage.setItem('token', token);
    }

    public static async login(loginData: LoginDataType) {
        const token = await API.User.login(loginData);
        localStorage.setItem('token', token);
    }

    public static logout() {
        localStorage.removeItem('token');
    }

    public static getToken() {
        return localStorage.getItem('token');
    }

    public static getUsername() {
        const token = localStorage.getItem('token');
        if (token === null)
            return null;
        const decodedToken = jwtDecode<JwtTokenType>(token);
        if (decodedToken.exp >= Date.now()) {
            Authentication.logout();
        } else {
            return decodedToken.sub;
        }
    }
}

export default Authentication;