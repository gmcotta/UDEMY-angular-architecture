import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { markFormGroupTouched, regex, regexErrorMessages } from '@app/shared';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';


@Component({
  selector: 'aa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  loading$ = new Observable<boolean | null>();
  form = new FormGroup({});
  regexErrorMessages = regexErrorMessages;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.loading$ = this.store.pipe(
      select(fromUser.getLoading)
    );

    this.form = this.formBuilder.group({
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
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        }
      ],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const values = this.form.value;
      const credentials: fromUser.EmailPasswordCredentials = {
        email: values.email,
        password: values.password,
      };
      this.store.dispatch(new fromUser.SignInEmail(credentials));
    } else {
      markFormGroupTouched(this.form);
    }
  }

}
