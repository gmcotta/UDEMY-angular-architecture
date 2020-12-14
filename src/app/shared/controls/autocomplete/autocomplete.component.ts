import { 
  Component, 
  EventEmitter, 
  forwardRef, 
  Input, 
  OnDestroy, 
  OnInit, 
  Output 
} from '@angular/core';
import { 
  ControlValueAccessor, 
  FormControl, 
  NG_VALUE_ACCESSOR 
} from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { 
  takeUntil, 
  map, 
  filter, 
  startWith, 
  distinctUntilChanged 
} from 'rxjs/operators';

import { ControlItem, Icon, Value } from '@app/models/frontend';

@Component({
  selector: 'aa-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    }
  ]
})
export class AutocompleteComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() items: ControlItem[] = [];
  @Input() placeholder: string = '';

  @Output() changed = new EventEmitter<Value>();

  formControl = new FormControl();

  options$ = new Observable<ControlItem[]>();
  private destroy = new Subject<any>();

  constructor() { 
  }

  ngOnInit(): void {
    this.options$ = this.formControl.valueChanges
      .pipe(
        startWith(''),
        filter((value: any) => typeof value === 'string' || typeof value === 'object'),
        map((value: string | ControlItem) => {
          return typeof value === 'string' ? value : value.label
        }),
        map(label => label ? this.filter(label) : this.items.slice())
      );

    this.formControl.valueChanges
      .pipe(
        takeUntil(this.destroy),
        distinctUntilChanged()
      )
      .subscribe(
        item => {
          const value = typeof item === 'object' ? item.value : null;
          this.propagateChange(value);
          this.changed.emit(value);
        },
      );
  }

  private filter(value: string): ControlItem[] {
    const filterValue = value.toLowerCase();
    return this.items.filter(item => {
      return item.label.toLowerCase().includes(filterValue)
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  writeValue(value: Value): void {
    const selectedOption = this.items.find(item => item.value === value);
    this.formControl.setValue(selectedOption);
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  displayFn(item?: ControlItem): string {
    return item ? item.label : '';
  }

  onBlur(): void {
    this.propagateTouched();
  }

  handleIconStyle(icon: Icon) {
    return icon ? icon.cssClass : '';
  }

}
