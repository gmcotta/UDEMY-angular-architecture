import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { markFormGroupTouched, regexErrorMessages } from '@app/shared';
import { Dictionaries } from '@app/store/dictionaries';
import { StepperService } from '../stepper/services';
import { RecruiterForm } from './roles/recruiter/recruiter.component';

export interface ProfessionalForm {
  about: string;
  roleId: string;
  role: RecruiterForm;
}

@Component({
  selector: 'aa-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessionalComponent implements OnInit, OnDestroy {

  @Input() value: ProfessionalForm = {} as ProfessionalForm;
  @Input() dictionaries: Dictionaries | null = null;

  @Output() changed = new EventEmitter<ProfessionalForm | null>();

  form = new FormGroup({});
  regexErrors = regexErrorMessages;
  private destroy = new Subject<any>();

  constructor(
    private stepperService: StepperService,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      roleId: [null, {
        updateOn: 'change',
        validators: [
          Validators.required,
        ]
      }],
      about: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
        ]
      }]
    });

    if (this.value) {
      this.form.patchValue(this.value);
    }

    this.stepperService.check$
      .pipe(takeUntil(this.destroy), tap(() => console.log('observable check - professional')))
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

}
