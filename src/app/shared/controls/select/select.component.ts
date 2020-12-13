import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ControlItem, Value } from '@app/models/frontend';

@Component({
  selector: 'aa-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {

  value: Value = '';
  isDisabled: boolean = false;

  @Input() items: ControlItem[] = [];
  @Input() placeholder: string = '';
  @Output() changed = new EventEmitter<Value>(); 

  constructor() { }

  ngOnInit(): void {
  }

  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  writeValue(value: Value): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }
  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  onChanged(event: MatSelectChange): void {
    const value = event.value ? event.value : null;
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }
  
  onBlur():void {
    this.propagateTouched();
  }


}
