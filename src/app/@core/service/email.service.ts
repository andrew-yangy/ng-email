import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmailService {
    constructor(
        private http: HttpClient
    ) { }
    validateEmail(email: string) {
        const pureEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return pureEmail.test(email);
    }
    sendEmail(body: any) {
        return this.http.post('api/email/send', body);
    }
}
