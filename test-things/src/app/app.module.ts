import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {PastebinService} from "./testing/pastebin.service";
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from "./testing/in-memory-data.service";
import { PastbinComponent } from './testing/pastbin/pastbin.component';
import { TestComponent } from './testing/test/test.component';
import { ChildComponent } from './testing/test/child/child.component';


@NgModule({
  declarations: [
    AppComponent,
    PastbinComponent,
    TestComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [PastebinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
