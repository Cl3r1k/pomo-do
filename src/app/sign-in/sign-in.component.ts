import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Environments
import { environment as environmentProd } from '@env/environment.prod';

// Services
import { ApiService } from '@app/_services/api.service';
import { AuthService } from '@app/_services/auth.service';

// Constants
const CONSOLE_TEXT_COLOR_COMPONENT = environmentProd.consoleTextColorComponent;

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    public frm: FormGroup;

    public isBusy = false;
    public hasFailed = false;
    public showInputErrors = false;

    authType = '';

    constructor(
        private _apiService: ApiService,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.frm = _formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
        // This part will be used for register/login
        this._route.url.subscribe(data => {
            this.authType = data[data.length - 1].path;
            console.log('%cauthType: ', CONSOLE_TEXT_COLOR_COMPONENT, this.authType);
        });
    }

    public doSignIn() {

        // Make sure form values are valid
        if (this.frm.invalid) {
            this.showInputErrors = true;
            return;
        }

        // Reset status
        this.isBusy = true;
        this.hasFailed = false;

        // Grab values from form
        const username = this.frm.get('username').value;
        const password = this.frm.get('password').value;

        // ----- Test case for Github Pages -----
        if (username === 'tst' && password === 'tst') {
            this._authService.doSignIn('tst.Token.12345', 'tst.name'); // TODO: Use real value for 'Token' and 'name' ? or delete this part
            this._router.navigate(['app']);
            return;
        }
        // ----- End test case -----

        // Submit request to API
        this._apiService.signIn(username, password).subscribe((response) => {
            this._authService.doSignIn(response['token'], response['name']);
            this._router.navigate(['app']);
        },
            (error) => {
                this.isBusy = false;
                this.hasFailed = true;
            });
    }

}
