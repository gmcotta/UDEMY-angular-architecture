import { FormGroup } from '@angular/forms';

export const markFormGroupTouched = (formGroup: FormGroup) => {
  Object.values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if ((control as FormGroup).controls) {
      markFormGroupTouched((control as FormGroup));
    }
  })
}
