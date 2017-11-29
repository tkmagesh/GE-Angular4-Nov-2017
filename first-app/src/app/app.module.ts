import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GreeterComponent } from './greeter/greeter.component';
import { Calculator1Component } from './calculator/calculator1.component';
import { Calculator2Component } from './calculator/calculator2.component';

@NgModule({
  declarations: [
    AppComponent
    , GreeterComponent
    , Calculator1Component
    , Calculator2Component
  ],
  imports: [
  	FormsModule
    , BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
