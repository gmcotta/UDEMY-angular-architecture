import { FormGroup } from '@angular/forms';
import { ControlItem } from '@app/models/frontend';

export const markFormGroupTouched = (formGroup: FormGroup) => {
  Object.values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if ((control as FormGroup).controls) {
      markFormGroupTouched((control as FormGroup));
    }
  })
}

export interface Control {
  items?: ControlItem[];
  changed: () => void;
  // TODO: change it to optional
  map: () => void;
}

export interface ControlEntities {
  [key: string]: Control;
}

export const mapControls = (controls: ControlEntities): void => {

  // TODO: Fix this when map is optional
  Object.keys(controls).forEach(key => {
    controls[key].map();
  });
}
