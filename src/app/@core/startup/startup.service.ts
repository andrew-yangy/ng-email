import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { SettingsService } from '../data/settings';

@Injectable()
export class StartupService {
    constructor(
        private http: HttpClient,
        private settingsService: SettingsService
    ) {
    }
    getSettings(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get('assets/mocks/app-data.json')
                .pipe(
                    catchError(() => {
                        resolve(null);
                        // handle error here
                        return of({});
                    })
                ).subscribe((appData: any) => {
                    this.settingsService.setUser(appData.user);
                },
                    () => { },
                    () => {
                        resolve(null);
                    });
        });
    }
}
