import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { StepperService } from './components/stepper/services';
import * as fromDictionaries from '@app/store/dictionaries/';
import * as fromRoot from '@app/store';
import { PersonalForm } from './components/personal/personal.component';
import { ProfessionalForm } from './components/professional/professional.component';
import * as fromUser from '@app/store/user';
import { ActivatedRoute } from '@angular/router';
export interface ProfileForm {
  personal: PersonalForm | null;
  professional: ProfessionalForm | null;
}

@Component({
  selector: 'aa-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit, OnDestroy {

  dictionaries$ = new Observable<fromDictionaries.Dictionaries>();
  dicionariesIsReady$ = new Observable<boolean>();

  private destroy = new Subject<any>();

  private user?: fromUser.User;

  constructor(
    public stepperService: StepperService,
    public store: Store<fromRoot.State>,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data['user'];

    this.dictionaries$ = this.store.pipe(
      select(fromDictionaries.getDictionaries)
    );
    this.dicionariesIsReady$ = this.store.pipe(
      select(fromDictionaries.getIsReady)
    );

    this.stepperService.init([
      { key: 'professional', label: 'Professional' },
      { key: 'personal', label: 'Personal' },
    ]);

    this.stepperService.complete$
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        console.log('stepper completed');
      });

    this.stepperService.cancel$
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        console.log('stepper canceled');
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  onChangedPersonal(data: PersonalForm): void {
    console.log('personal changed:', data);
  }
  
  onChangedProfessional(data: ProfessionalForm | null): void {
    console.log('professional changed:', data);
  }



}
