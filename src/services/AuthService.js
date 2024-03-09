import $api from "../http";


export default class AuthService {
    static async login(login, password) {
        return $api.post('/login', {login, password})
    }       
}