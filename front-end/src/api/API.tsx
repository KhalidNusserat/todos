import axios from "axios";
import CONSTANTS from "../constants";
import { User } from "./User";
import { Todos } from "./Todos";

export default class API {
    private constructor() {
    }

    private static readonly axios = axios.create({
        baseURL: CONSTANTS.SERVER.URL
    });

    public static get Axios() {
        return API.axios;
    }

    public static User = User;
    public static Todos = Todos;
}