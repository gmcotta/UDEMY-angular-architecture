import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dictionaries } from '@app/store/dictionaries';
import { RecruiterForm } from '../recruiter/recruiter.component';

export interface EmployeeForm {
  specialization: string;
  skills: string[];
  qualification: string;
  expectedSalary: number;
}

@Component({
  selector: 'aa-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  @Input() parent = new FormGroup({});
  @Input() name = '';
  @Input() value?: RecruiterForm | EmployeeForm;
  @Input() dictionaries: Dictionaries | null = {} as Dictionaries;

  form = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      specialization: [null, {
        updateOn: 'change',
        validators: [
          Validators.required
        ]
      }],
      skills: [null, {
        updateOn: 'change',
        validators: [
          Validators.required
        ]
      }],
      qualification: [null, {
        updateOn: 'change',
        validators: [
          Validators.required
        ]
      }],
      expectedSalary: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required
        ]
      }],
    });

    if (this.value) {
      this.form.patchValue(this.value);
    }

    this.parent.addControl(this.name, this.form);
  }

  ngOnDestroy(): void {
    this.parent.removeControl(this.name);
  }

}
