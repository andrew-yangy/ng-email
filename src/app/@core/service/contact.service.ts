import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../model';
import { AsyncSubject } from 'rxjs/AsyncSubject';

@Injectable()
export class ContactService {
    private cache = new Map<string, Observable<User[]>>();
    constructor(
        private http: HttpClient
    ) { }
    getContacts(): Observable<User[]> {
        const url = 'assets/mocks/contact.json';
        if (!this.cache.has(url)) {
            this.cache.set(url, this.fetchContacts(url));
        }
        return this.cache.get(url);
    }
    private fetchContacts(url: string): Observable<User[]> {
        const subject = new AsyncSubject<User[]>();
        this.http
            .get<User[]>(url, { responseType: 'json' })
            .subscribe(subject);
        return subject.asObservable();
    }
}
