import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormGroupTouched, regex, regexErrorMessages } from '@app/shared';
import { Dictionaries } from '@app/store/dictionaries';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { StepperService } from '../stepper/services';


export interface PersonalForm {
  name: string;
  photoURL: string;
  country: string;
}
@Component({
  selector: 'aa-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalComponent implements OnInit, OnDestroy {

  @Input() value: PersonalForm = {} as PersonalForm;
  @Input () dictionaries: Dictionaries | null = {} as Dictionaries;

  @Output() changed = new EventEmitter<PersonalForm>();

  form: FormGroup = new FormGroup({});
  patternError = regexErrorMessages;
  private destroy = new Subject<any>();

  constructor(
    private stepperService: StepperService,
    private formBuiler: FormBuilder,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuiler.group({
      photoURL: [null],
      name: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.maxLength(128),
          Validators.pattern(regex.latinAndSpaces),
        ]
      }],
      country: [null, {
        updateOn: 'change',
        validators: [
          Validators.required
        ]
      }],
    });

    if (this.value) {
      this.form.patchValue(this.value);
    }

    this.stepperService.check$
      .pipe(takeUntil(this.destroy), tap(() => console.log('observable check - personal')))
      .subscribe(type => {
        if (this.form.invalid) {
          markFormGroupTouched(this.form);
          this.form.updateValueAndValidity();
          this.cdRef.detectChanges();
        } else {
          this.changed.emit(this.form.value);
        }
        this.stepperService[type].next(this.form.valid);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  onPhotoChanged(url: string | string[]): void {
    if (url && typeof url === 'string') {
      this.form.controls.photoURL.setValue(url);
    }
  }

}
