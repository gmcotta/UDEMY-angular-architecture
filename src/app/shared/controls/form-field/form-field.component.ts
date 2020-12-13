import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'aa-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {

  @Input() label: string = '';
  @Input() required: boolean = true;
  @Input() isInline: boolean = true;
  @Input() control?: AbstractControl;
  @Input() patternError?: string;

  constructor() { }

  ngOnInit(): void {
  }

  hasError(): boolean | undefined {
    return this.control && this.control.invalid && this.control.touched;
  }

  get errorKey() {
    return this.control 
      && this.control.errors 
      && Object.keys(this.control.errors)[0];
  }

}
