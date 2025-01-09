import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './storage/storage.service';
import { LoaderService } from './loader/loader.service';
import { DataService } from './data-sharing/data.service';
import { ApiService } from './api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FullScreenService } from './full-screen/full-screen.service';

@NgModule({
  imports: [CommonModule,HttpClientModule],
  providers:[
    StorageService,
    LoaderService,
    DataService,
    ApiService,
    FullScreenService,
  ]
})
export class ServicesModule {}
