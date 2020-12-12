import { Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'aa-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {

  value: string = '';
  isDisabled: boolean = false;
  @Input() placeholder: string = '';
  @Output() changed = new EventEmitter();

  constructor() { }

  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  ngOnInit(): void {
  }

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onKeyup(event: KeyboardEvent): void {
    const el = event.target as HTMLInputElement;
    this.value = el.value;
    this.propagateChange(el.value);
    this.changed.emit(el.value);
  }

  onBlur(): void {
    this.propagateTouched()
  }

}
