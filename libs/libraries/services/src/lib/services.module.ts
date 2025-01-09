import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './storage/storage.service';
import { ApiService } from './api/api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule,HttpClientModule],
  providers:[
    StorageService,
    ApiService,
  ]
})
export class ServicesModule {}
