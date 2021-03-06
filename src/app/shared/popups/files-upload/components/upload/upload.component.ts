import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, of, Subject } from 'rxjs';
import { finalize, takeUntil, catchError } from 'rxjs/operators';

@Component({
  selector: 'aa-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  @Input() file?: File | null;
  @Output() completed = new EventEmitter<string>();

  task?: AngularFireUploadTask;
  percentage$ = new Observable<number | undefined>();
  snapshot$ = new Observable<firebase.default.storage.UploadTaskSnapshot | undefined>();
  downloadURL: string = '';

  private destroy = new Subject<void>();

  constructor(
    private storage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this.startUpload();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  startUpload(): void {
    const path = `${this.file?.type.split('/')[0]}/${Date.now()}_${this.file?.name}`;
    const storageRef = this.storage.ref(path);
    this.task = this.storage.upload(path, this.file);

    this.percentage$ = this.task.percentageChanges();
    this.snapshot$ = this.task.snapshotChanges();
    this.snapshot$
      .pipe(
        takeUntil(this.destroy),
        catchError(err => of(console.log(err))),
        finalize(async () => {
          this.downloadURL = await storageRef.getDownloadURL().toPromise()
            .catch(err => console.log(err));
          this.completed.next(this.downloadURL);
        })
      )
      .subscribe();
  }   

}
