import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmailService {
    constructor(
        private http: HttpClient
    ) { }
    sendEmail(body: any) {
        this.http.post('api/email/send', body)
        .subscribe(res => {
            console.log(res);
        });
    }
}
