import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmailService {
    constructor(
        private http: HttpClient
    ) { }
    sendEmail(body: any) {
        return this.http.post('api/email/send', body);
    }
}
