import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageCropperModule } from 'ngx-image-cropper';

import { FilesUploadDirective } from './files-upload.directive';
import { FilesUploadComponent } from './files-upload.component';
import { DropZoneDirective } from './directives/drop-zone/drop-zone.directive';

@NgModule({
  declarations: [
    FilesUploadDirective, 
    FilesUploadComponent, 
    DropZoneDirective,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ImageCropperModule,
  ],
  exports: [
    FilesUploadDirective,
  ]
})
export class FilesUploadModule { }
