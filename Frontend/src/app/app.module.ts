import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { A11yModule } from '@angular/cdk/a11y';
import { MatCheckboxModule } from '@angular/material/checkbox';



import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AboutComponent } from './about/about.component';
import { IntroComponent } from './intro/intro.component';


import {OverlayContainer} from '@angular/cdk/overlay';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;



@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    IntroComponent,
  ],
  imports: [
    HttpClientModule,
    A11yModule,
    BrowserModule,
    MatButtonModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatDialogModule,
    PlotlyModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('dark-theme');
  }
}
