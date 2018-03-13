import { Component } from '@angular/core';
import { removePreloader } from './shared/preloaderFinished';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor() {
        removePreloader();
    }
}
