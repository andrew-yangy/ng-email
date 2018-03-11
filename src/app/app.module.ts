import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ComposeEmailComponent} from './components/compose-email/compose-email.component';
import {StartupService} from './@core/startup/startup.service';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ContactComponent} from './components/contact/contact.component';

export function StartupServiceFactory(startupService: StartupService): Function {
  return () => startupService.getSettings();
}

@NgModule({
  declarations: [
    AppComponent,
    ComposeEmailComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
