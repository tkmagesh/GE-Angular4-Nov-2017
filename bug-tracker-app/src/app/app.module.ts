import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BugTrackerComponent } from './bugTracker/bugTracker.component';
import { BugOperationsService } from './bugTracker/services/bugOperations.service';
import { TrimTextPipe } from './bugTracker/pipes/trimText.pipe';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
    , BugTrackerComponent
    , TrimTextPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [
  	BugOperationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
