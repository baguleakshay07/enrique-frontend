import {HttpHeaders} from '@angular/common/http';
import BigNumber from 'bignumber.js';

export class Helpers {


    static jwt() {
        let httpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.append('Content-Type', 'application/json');
           /* .append('Cache-Control', 'no-cache');*/

        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            return {headers: httpHeaders.append('x-access-token', currentUser.token)};
        } else {
            return {headers: httpHeaders};
        }
    }

    static jwtDirect() {
        let httpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.append('Content-Type', 'application/json')
            .append('Cache-Control', 'no-cache');
        return {headers: httpHeaders};
    }
}
