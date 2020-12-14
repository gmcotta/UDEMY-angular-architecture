import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from './store';
import * as fromDictionaries from './store/dictionaries';

@Component({
  selector: 'aa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new fromDictionaries.Read());
  }
}
