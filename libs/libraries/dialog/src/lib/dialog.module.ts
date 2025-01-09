import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromptComponent } from './prompt/prompt.component';
import { PromptService } from './prompt/prompt.service';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PromptComponent],
  imports: [CommonModule,MatButtonModule],
  providers:[PromptService]
})
export class MackDialogModule { }
