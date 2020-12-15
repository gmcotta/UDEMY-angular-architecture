import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  multiple: boolean;
  crop: boolean;
}
@Component({
  selector: 'aa-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss']
})
export class FilesUploadComponent implements OnInit {

  isHovering?: boolean;
  files: Array<File | null> = [];
  imageFile: File | null = null;
  isError = false;
  filesURLs: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<FilesUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
  }

  toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  onDrop(files: any): void {
    
    // console.log(files);
    // const element = $event.target as HTMLInputElement;
    // const files = element.files;

    this.isError = false;
    this.files = [];

    if (files) {
      if (this.data.crop && files?.length > 1) {
        this.isError = true;
        return;
      }

      if (this.data.crop && 
          files.length === 1 && 
          files.item(0).type.split('/')[0] === 'image'
      ) {
        this.imageFile = files.item(0);
        return;
      }

      for (let i = 0; i < files?.length; i++) {
        this.files.push(files.item(i));
      }
    }
    console.log(this.files);
  }

  onUploadComplete(url: string): void {
    this.filesURLs.push(url);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onComplete(): void {
    const res = this.data.multiple ? this.filesURLs : this.filesURLs[0];
    this.dialogRef.close(res);
  }

  onCrop(file: File): void {
    this.imageFile = null;
    this.files.push(file);
  }

}
