import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import {userReducer} from "./store/user/user.reducer";
import {taskReducer} from "./store/task/task.reducer";
import {DashboardComponent} from "./components/pages/dashboard/dashboard.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {MY_DATE_FORMATS} from "./helpers/date-format";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      users: userReducer,
      tasks: taskReducer
    }),
    DashboardComponent,
  ],
  providers: [
    provideAnimationsAsync(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
