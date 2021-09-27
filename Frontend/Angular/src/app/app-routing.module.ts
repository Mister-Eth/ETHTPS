import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { IntroComponent } from './intro/intro.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'intro'},
  { path: 'intro', component: IntroComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
