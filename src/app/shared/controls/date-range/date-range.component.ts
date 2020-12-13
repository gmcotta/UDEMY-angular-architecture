import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { 
  ControlValueAccessor, 
  FormBuilder, 
  FormGroup, 
  NG_VALUE_ACCESSOR 
} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

export interface Value {
  from: number;
  to: number;
}

export interface Placeholder {
  from: string;
  to: string;
}

@Component({
  selector: 'aa-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangeComponent),
      multi: true,
    }
  ]
})
export class DateRangeComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder?: Placeholder;

  @Output() changed = new EventEmitter<Value>();


  form = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder
  ) { }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      from: [null],
      to: [null],
    });
  }

  get min(): Date | undefined {
    const from = this.form.controls.from.value;
    return from ? new Date(from) : undefined;
  }

  get max(): Date | undefined {
    const to = this.form.controls.to.value;
    return to ? new Date(to) : undefined;
  }

  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};
  
  writeValue(value: Value): void {
    this.form.patchValue(value || {});
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  onChanged(): void {
    const value = { ...this.form.value };
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onClosed(): void {
    this.propagateTouched();
  }

}
