import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BugTrackerComponent } from './bugTracker/bugTracker.component';
import { BugOperationsService } from './bugTracker/services/bugOperations.service';



import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
    , BugTrackerComponent
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
