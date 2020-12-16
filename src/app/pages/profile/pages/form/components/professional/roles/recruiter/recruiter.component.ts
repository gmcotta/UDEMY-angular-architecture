import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dictionaries } from '@app/store/dictionaries';
import { EmployeeForm } from '../employee/employee.component';

export interface RecruiterForm {
  companyName: string;
  employeesCount: number;
}
@Component({
  selector: 'aa-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.scss']
})
export class RecruiterComponent implements OnInit, OnDestroy {

  @Input() parent = new FormGroup({});
  @Input() name: string = '';
  @Input() value?: RecruiterForm | EmployeeForm;
  @Input() dictionaries: Dictionaries | null = {} as Dictionaries;

  form = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      companyName: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required
        ]
      }],
      employeesCount: [null, {
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
