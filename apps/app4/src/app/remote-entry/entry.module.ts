import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { remoteRoutes } from './entry.routes';
import { ContainerComponent } from './_container/container.component';
import { InputComponent } from '@shell/shared';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(remoteRoutes), 
    InputComponent,ContainerComponent],
  providers: [],
})
export class MackAngularModule {

}
