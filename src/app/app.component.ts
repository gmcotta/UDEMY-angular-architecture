import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromRoot from './store';
import * as fromUser from './store/user';
import * as fromDictionaries from './store/dictionaries';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

@Component({
  selector: 'aa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isAuthorized$ = new Observable<boolean | null>();

  constructor(
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.isAuthorized$ = this.store.pipe(
      select(fromUser.getIsAuthorized)
    );
    this.store.dispatch(new fromUser.Init());
    this.store.dispatch(new fromDictionaries.Read());
    // this.store.pipe(select(fromUser.getUserState))
    //   .pipe(
    //     tap((state) => console.log(state)),
    //     filter(state => !!state.uid),
    //     take(1)
    //   ).subscribe(() => this.store.dispatch(new fromDictionaries.Read()));
  }

  onSignOut(): void {
    this.store.dispatch(new fromUser.SignOut());
  }
}
