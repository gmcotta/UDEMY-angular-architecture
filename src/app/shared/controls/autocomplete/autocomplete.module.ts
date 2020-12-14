import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AutocompleteComponent } from './autocomplete.component';
import { HighlightPipe } from './pipes/highlight.pipe';



@NgModule({
  declarations: [
    AutocompleteComponent,
    HighlightPipe,
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  exports: [
    AutocompleteComponent,
  ],
})
export class AutocompleteModule { }
