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
  ButtonModule, 
  CheckboxesModule, 
  DateRangeModule, 
  FilesUploadModule, 
  FormFieldModule, 
  InputModule, 
  RadiosModule, 
  SelectModule, 
  SpinnerModule, 
  UserPhotoModule
} from '@app/shared';
import { RecruiterComponent } from './components/professional/roles/recruiter/recruiter.component';
import { EmployeeComponent } from './components/professional/roles/employee/employee.component';
import { ExperiencesComponent } from './components/professional/roles/employee/experiences/experiences.component';

@NgModule({
  declarations: [
    FormComponent, 
    PersonalComponent, 
    ProfessionalComponent,
    RecruiterComponent,
    EmployeeComponent,
    ExperiencesComponent,
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
    SelectModule,
    CheckboxesModule,
    DateRangeModule,
    ButtonModule,
  ],
})
export class FormModule { }
