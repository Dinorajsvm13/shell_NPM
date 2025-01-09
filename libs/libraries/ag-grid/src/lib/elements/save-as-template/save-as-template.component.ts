import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-save-as-template',
  templateUrl: './save-as-template.component.html',
  styleUrls: ['./save-as-template.component.css']
})
export class SaveAsTemplateComponent implements OnInit {
  saveAsForm!: FormGroup;
  isOnlySpacesError: boolean = false;

  constructor(private fb: FormBuilder,public dialogRef : MatDialogRef<SaveAsTemplateComponent>) { }

  ngOnInit(): void {
    this.saveAsForm = this.fb.group({
      templateName: ['', [Validators.required]],
    });
  }
  dialogClose(optionData: any) {
    const formValue = this.saveAsForm.value;
    if (this.isOnlySpacesError && optionData == 'true') {
     alert('Enter Template Name')
      return;
    } else if (formValue.templateName && optionData == 'true') {
      this.dialogRef.close(formValue.templateName);
    } else {
      this.dialogRef.close(null);
    }
  }

  onChangeInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    this.isOnlySpacesError = /^\s*$/.test(inputValue);

    const sanitizedValue = inputElement.value.replace(/[^a-zA-Z0-9\s]/g, '');
    
    if (sanitizedValue !== inputElement.value) {
      inputElement.value = sanitizedValue;
      inputElement.dispatchEvent(new Event('input'));
    }
  }
}
