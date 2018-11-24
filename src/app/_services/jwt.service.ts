import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JwtService {

    private TOKEN_KEY = 'session_data';

    constructor() { }

    getToken() {
        // return window.localStorage[this.TOKEN_KEY];
        return JSON.parse(localStorage.getItem(this.TOKEN_KEY));
    }

    // Rename method to 'saveSession' and others
    saveToken(session_object) {
        // window.localStorage['jwtToken'] = token;
        localStorage.setItem(this.TOKEN_KEY, JSON.stringify(session_object));
    }

    destroyToken() {
        window.localStorage.removeItem(this.TOKEN_KEY);
    }
}
