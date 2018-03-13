import { Injectable } from '@angular/core';
import { User } from '../model';

@Injectable()
export class SettingsService {
    user: User = {};
    constructor() {
    }
    setUser(val: User) {
        this.user = Object.assign(this.user, val);
    }
}
