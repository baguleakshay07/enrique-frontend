import {Injectable} from '@angular/core';
import { BehaviorSubject, pipe } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';
import {environment} from '../../environments/environment';
import {Helpers} from '../helpers/Helpers';
import { map} from 'rxjs/operators';

@Injectable()
export class CurrencyService {
    private static authURL = environment.host + '/api/v1/auth/sign-in';
    private static signupURL = environment.host + '/api/v1/auth/sign-up';
    private static logoutURL = environment.host + '/api/v1/auth/logout';


    private currentUser;
    public currentUser$ = new BehaviorSubject<User>(this.currentUser);

    constructor(private http: HttpClient) {
        if (localStorage.getItem('currentUser')) {
            this.currentUser$.next(JSON.parse(localStorage.getItem('currentUser')));
        }

        let user;
        let token;
        if (localStorage.getItem('currentUser')) {
            user = JSON.parse(localStorage.getItem('currentUser'));
            token = user.token;
        }
    }


    login(email: string, password: string, captcha: string) {
        return this.http.post<any>(CurrencyService.authURL, JSON.stringify({
            email,
            password,
            captcha
        }), Helpers.jwt()).pipe(map((user) => {
            if (user ) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUser$.next(user);
            }
            return user;
        }));
    }

    signup(user: User, captcha: string) {
        user.captcha = captcha;
        return this.http.post<string>(CurrencyService.signupURL, user, Helpers.jwt());
    }

    logout() {
        return this.http.post<any>(CurrencyService.logoutURL, null, Helpers.jwt());
    }

}
