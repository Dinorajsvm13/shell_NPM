import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputComponent } from '@shell/shared';

@Component({
  selector: 'shell-app2-container',
  standalone:true,
  imports:[CommonModule, InputComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent {}
