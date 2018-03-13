import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { SettingsService } from './data/settings';
import { ContactService } from './service/contact.service';
import { EmailService } from './service/email.service';


@NgModule({
    providers: [
        SettingsService,
        ContactService,
        EmailService
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
