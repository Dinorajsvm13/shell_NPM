import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'shared-input',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  inputValue:string=''
  @Input() placeholder:string='Enter Value 01'
}
