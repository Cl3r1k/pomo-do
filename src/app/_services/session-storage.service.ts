import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SessionStorageService {

    consoleTextColorService = 'color: salmon;';

    public session_object = {
        created_time: null as string,
        expire_time: null as string,
        last_used_time: null as string,
        token: null as string,
        account: {
            avatar: null as string,
            display_name: null as string,
            email: null as string,
            email_verified: null as boolean,
            id: null as string,
            jwToken: null as string,
            name: null as string,
            username: null as string,
            register_time: null as string
        }
    };

    // public accessToken: string;
    // public name: string;

    constructor() {
        this.session_object.created_time = new Date().toISOString();
        this.session_object.expire_time = '';
        this.session_object.last_used_time = new Date().toISOString();
        this.session_object.token = '';
        this.session_object.account.avatar = 'some_kind_of_avatar';
        this.session_object.account.display_name = '';
        this.session_object.account.email = 'some_kind_of@email.com';
        this.session_object.account.email_verified = false;
        this.session_object.account.id = '1';
        this.session_object.account.jwToken = '';
        this.session_object.account.name = '';
        this.session_object.account.username = '';
        this.session_object.account.register_time = new Date().toISOString();

        console.log('%cCreated session_object: ', this.consoleTextColorService , this.session_object);
    }

    public destroy(): void {
        // this.accessToken = null;
        // this.name = null;

        // Clear all props
        this.session_object.created_time = null;
        this.session_object.expire_time = null;
        this.session_object.last_used_time = null;
        this.session_object.token = null;
        this.session_object.account.avatar = null;
        this.session_object.account.display_name = null;
        this.session_object.account.email = null;
        this.session_object.account.email_verified = false;
        this.session_object.account.id = null;
        this.session_object.account.jwToken = null;
        this.session_object.account.name = null;
        this.session_object.account.username = null;
        this.session_object.account.register_time = null;
    }
}
