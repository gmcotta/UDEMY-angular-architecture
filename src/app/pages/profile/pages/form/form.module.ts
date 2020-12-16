import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { StepperModule } from './components/stepper/stepper.module';
import { PersonalComponent } from './components/personal/personal.component';
import { ProfessionalComponent } from './components/professional/professional.component';
import { ReactiveFormsModule } from '@angular/forms';
import { 
  AutocompleteModule, 
  FilesUploadModule, 
  FormFieldModule, 
  InputModule, 
  RadiosModule, 
  SpinnerModule, 
  UserPhotoModule
} from '@app/shared';

@NgModule({
  declarations: [
    FormComponent, 
    PersonalComponent, 
    ProfessionalComponent,
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    ReactiveFormsModule,
    StepperModule,
    FormFieldModule,
    InputModule,
    AutocompleteModule,
    SpinnerModule,
    FilesUploadModule,
    UserPhotoModule,
    RadiosModule,
  ],
})
export class FormModule { }
