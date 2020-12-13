import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Value } from '@app/models/frontend';

@Component({
  selector: 'aa-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true,
    }
  ],
})
export class DateComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder?: string;
  @Input() min?: Date;
  @Input() max?: Date;

  @Output() changed = new EventEmitter<Value>();

  value: Value | null = 0;
  isDisabled = false;

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
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  get inputValue(): Date | null {
    return this.value ? new Date(this.value as string | number) : null;
  }

  onChanged(event: MatDatepickerInputEvent<Date>): void {
    const value = event.value ? event.value.getTime() : null;

    this.value = value;
    if (value !== null) {
      this.propagateChange(value);
      this.changed.emit(value);
    }
  }

  onClosed(): void {
    this.propagateTouched();
  }

}
