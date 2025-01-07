import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { remoteRoutes } from './entry.routes';
import { ContainerComponent } from './_container/container.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(remoteRoutes),ContainerComponent],
  providers: [],
})
export class MackAngularModule {

}
