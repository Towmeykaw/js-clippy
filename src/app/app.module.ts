import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JsClippyModule } from 'js-clippy';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    JsClippyModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
