import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      input: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(regex.numbers),
        ]
      }],
      password: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
        ]
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
