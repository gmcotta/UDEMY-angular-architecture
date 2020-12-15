import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageCropperModule } from 'ngx-image-cropper';

import { FilesUploadDirective } from './files-upload.directive';
import { FilesUploadComponent } from './files-upload.component';
import { DropZoneDirective } from './directives/drop-zone/drop-zone.directive';
import { UploadComponent } from './components/upload/upload.component';
import { FileSizePipe } from './pipes/file-size/file-size.pipe';

@NgModule({
  declarations: [
    FilesUploadDirective, 
    FilesUploadComponent, 
    DropZoneDirective, 
    UploadComponent, FileSizePipe,
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
