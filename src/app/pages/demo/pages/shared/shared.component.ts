import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlItem } from '@app/models/frontend';
import { regex, regexErrorMessages } from '@app/shared';

@Component({
  selector: 'aa-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  isInline = true;
  regexErrorMessages = regexErrorMessages;

  items: ControlItem[] = [
    { label: 'First', value: 1 },
    { label: 'Second', value: 2 },
    { label: 'Third', value: 3 },
    { label: 'Fourth', value: 4 },
    { label: 'Fifth', value: 5 },
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      input: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(regex.numbers),
        ],
      }],
      password: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
        ],
      }],
      select: [null, {
        updateOn: 'change',
        validators: [
          Validators.required,
        ],
      }],
      checkboxes: [null, {
        updateOn: 'change',
        validators: [
          Validators.required,
        ],
      }],
      radios: [null, {
        updateOn: 'change',
        validators: [
          Validators.required,
        ],
      }],
      date: [null, {
        updateOn: 'change',
        validators: [
          Validators.required,
        ],
      }],
      dateRange: [null, {
        updateOn: 'change',
        validators: [
          Validators.required,
        ],
      }]
    });
  }

  onPatchValue(): void {
    this.form.patchValue({ input: 'test' });
  }

  onToggleInline() {
    this.isInline = !this.isInline;
  }

  onSubmit(): void {
    console.log('Submit form');
  }
}
