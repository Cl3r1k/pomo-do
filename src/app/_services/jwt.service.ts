import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JwtService {

    private TOKEN_KEY = 'session_data';

    session_object: {
        created_time: string,
        expire_time: string,
        last_used_time: string,
        token: string,
        account: {
            avatar: string,
            display_name: string,
            email: string,
            email_verified: boolean,
            id: string,
            jwToken: string,
            name: string,
            username: string,
            register_time: string
        }
    };


    constructor() { }

    getToken() {
        // return window.localStorage[this.TOKEN_KEY];
        return localStorage.getItem(this.TOKEN_KEY);
    }

    saveToken(token: string) {
        // window.localStorage['jwtToken'] = token;
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    destroyToken() {
        window.localStorage.removeItem(this.TOKEN_KEY);
    }
}
