import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import * as fromProfileUser from '../../store/user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'aa-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayComponent implements OnInit, OnDestroy {

  user$ = new Observable<fromProfileUser.User | null | undefined>();
  isOwnProfile$ = new Observable<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(fromProfileUser.getUser));
    this.activatedRoute.params.subscribe((params: Params) => {
      const id = params.id;
      this.store.dispatch(new fromProfileUser.Read(id));
      this.isOwnProfile$ = this.store.pipe(
        select(fromUser.getUser),
        map(user => user?.uid === id),
      );
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new fromProfileUser.Clear());
  }

}
