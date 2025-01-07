import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { getDynamicRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainerComponent } from './container/container.component';


@NgModule({
  declarations: [AppComponent,ContainerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(getDynamicRoutes(), {
      initialNavigation: 'enabledBlocking',
    }),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {
 
 }
