import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';


import * as fromRoot from '@app/store';
import { markFormGroupTouched, regex, regexErrorMessages } from '@app/shared';
@Component({
  selector: 'aa-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {

  form = new FormGroup({});
  regexErrorMessages = regexErrorMessages;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: [
          null, 
          {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.maxLength(128),
              Validators.pattern(regex.email),
            ],
          }
        ],
        password: [
          '', 
          {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(30),
              Validators.pattern(regex.password),
            ],
          }
        ],
        passwordRepeat: [
          '', 
          {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(30),
              Validators.pattern(regex.password),
            ],
          }
        ],
      }, {
        validators: [this.repeatPasswordValidator]
      }
    );
  }

  onSubmit(): void {
    if (this.form.valid) {

    } else {
      markFormGroupTouched(this.form);
    }
  }

  private repeatPasswordValidator(
    group: AbstractControl
    ): { [key: string]: boolean} | null {
      const password = group.get('password');
      const passwordRepeat = group.get('passwordRepeat');
      console.log(password?.value, passwordRepeat?.value);
        return passwordRepeat?.value && password?.value !== passwordRepeat?.value 
          ? { repeat: true }
          : null;
    }
}
