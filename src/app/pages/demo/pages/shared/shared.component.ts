import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlItem } from '@app/models/frontend';
import { NotificationService } from '@app/services/notification/notification.service';
import { regex, regexErrorMessages, markFormGroupTouched } from '@app/shared';

@Component({
  selector: 'aa-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  isInline = true;
  regexErrorMessages = regexErrorMessages;
  showSpinner = false;

  items: ControlItem[] = [
    { label: 'First', value: 1 },
    { label: 'Second', value: 2 },
    { label: 'Third', value: 3 },
    { label: 'Fourth', value: 4 },
    { label: 'Fifth', value: 5 },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
  ) { }

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
      }],
      autocomplete: [null, {
        updateOn: 'change',
        validators: [
          Validators.required,
        ],
      }],
    });
  }

  onPatchValue(): void {
    this.form.patchValue({ 
      input: 'test',
      password: 'qwerty',
      select: 2,
      checkboxes: [1, 3],
      radios: 4,
      date: new Date().getTime(),
      dateRange: {
        from: new Date(2020, 11, 1).getTime(),
        to: new Date(2020, 11, 31).getTime(),
      },
      autocomplete: 5, 
    });
  }

  onToggleInline() {
    this.isInline = !this.isInline;
  }

  onToggleDisable() {
    if (this.form.enabled) {
      this.form.disable()
    } else {
      this.form.enable();
    }
  }

  onSubmit(): void {
    console.log('Submit form');
    if (this.form.invalid) {
      markFormGroupTouched(this.form);
    }
  }

  onToggleSpinner(): void {
    this.showSpinner = !this.showSpinner;
  }

  onError(): void {
    this.notificationService.error('Something is wrong');
  }

  onSuccess(): void {
    this.notificationService.success('Everything is fine!');
  }
}
