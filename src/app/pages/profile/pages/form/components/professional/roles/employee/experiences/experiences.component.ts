import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface ExperienceForm {
  companyName: string;
  period: Period;
}

export interface Period {
  from: number;
  to: number;
}

@Component({
  selector: 'aa-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit, OnDestroy {

  @Input() parent = new FormGroup({});
  @Input() name = '';
  @Input() values: ExperienceForm[] = [];

  form: FormArray = new FormArray([]);

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.values = this.values ? this.values : [];
    this.init();
  }

  ngOnDestroy(): void {
    this.parent.removeControl(this.name);
  }

  addExperience(): void {
    this.form.push(this.getFormGroup());
  }

  deleteExperience(index: number): void {
    this.form.removeAt(index);
  }

  getNestedGroupForm(index: number): FormGroup {
    return this.form.controls[index] as FormGroup;
  }

  private init(): void {
    // this.form = this.formBuilder.array(
    //   [
    //     this.formBuilder.group({
    //       companyName: [null, {
    //         updateOn: 'blur',
    //         validators: [
    //           Validators.required
    //         ]
    //       }],
    //       period: [null, {
    //         updateOn: 'change',
    //         validators: [
    //           Validators.required
    //         ]
    //       }]
    //     }),
    //     this.formBuilder.group({
    //       companyName: [null, {
    //         updateOn: 'blur',
    //         validators: [
    //           Validators.required
    //         ]
    //       }],
    //       period: [null, {
    //         updateOn: 'change',
    //         validators: [
    //           Validators.required
    //         ]
    //       }]
    //     }),
    //   ],
    // )
    this.form = this.formBuilder.array(this.getFormGroupArray(this.values));

    this.parent.addControl(this.name, this.form);
  }

  private getFormGroupArray(values: ExperienceForm[]): FormGroup[] {
    if (this.values?.length) {
      console.log('tenho valor');
      return values.map(value => this.getFormGroup(value));
    } else {
      console.log('não tenho valor');
      return [this.getFormGroup()];
    }
  }

  private getFormGroup(value?: ExperienceForm): FormGroup {
    const group = this.formBuilder.group({
      companyName: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required
        ]
      }],
      period: [null, {
        updateOn: 'change',
        validators: [
          Validators.required
        ]
      }]
    });
    if (value) {
      group.patchValue(value);
    }
    return group;
  }
}
