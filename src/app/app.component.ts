import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'aa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private ngFirestore: AngularFirestore,
  ) {}

  ngOnInit(): void {
    this.ngFirestore
      .collection('test')
      .snapshotChanges()
      .subscribe(items => {
        items.map(item => console.log(item.payload.doc.data()));
      });
  }

  title = 'aa-project';
}
