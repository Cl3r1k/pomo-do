import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { SessionStorageService } from '@app/_services/session-storage.service';
import { JwtService } from '@app/_services/jwt.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private _sessionStorageService: SessionStorageService, private _jwtService: JwtService, private _router: Router) { }

    public isSignedIn() {
        return !!this._sessionStorageService.session_object.account.jwToken;
    }

    public doSignOut() {
        this._sessionStorageService.destroy();
        this.purgeAuth();
    }

    public doSignIn(accessToken: string, name: string) {
        if (!accessToken || !name) {
            return;
        }

        this._sessionStorageService.init();

        this._sessionStorageService.session_object.account.jwToken = accessToken;
        this._sessionStorageService.session_object.account.name = name;
        this._sessionStorageService.session_object.account.display_name = name;

        this.setAuth(this._sessionStorageService.session_object);
    }

    setAuth(session_object) {
        this._jwtService.saveToken(session_object);
    }

    populate() {
        const session_data = this._jwtService.getToken();
        if (session_data) {
            this.doSignIn(session_data['account']['jwToken'], session_data['account']['name']);
            this._router.navigate(['todos']);
        }
    }

    purgeAuth() {
        this._jwtService.destroyToken();
    }
}
