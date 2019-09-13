import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { BarchartComponent } from './shared/barchart/barchart.component';

import { HomeComponent } from './home/home.component';
import { SankeyComponent } from './shared/sankey/sankey.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, BarchartComponent, HomeComponent, SankeyComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
