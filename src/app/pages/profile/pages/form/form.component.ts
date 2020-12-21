import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, zip } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { StepperService } from './components/stepper/services';
import { MapperService } from './services';

import * as fromDictionaries from '@app/store/dictionaries/';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import * as fromForm from '../../store/form';

import { PersonalForm } from './components/personal/personal.component';
import { ProfessionalForm } from './components/professional/professional.component';

export interface ProfileForm {
  personal: PersonalForm;
  professional: ProfessionalForm;
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

  personal$ = new Observable<PersonalForm>();
  professional$ = new Observable<ProfessionalForm>();
  loading$ = new Observable<boolean | null>();

  private profile$ = new Observable<ProfileForm>();
  private isEditing = false;
  private user?: fromUser.User;
  private destroy = new Subject<any>();

  constructor(
    public stepperService: StepperService,
    public store: Store<fromRoot.State>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private mapperService: MapperService,
  ) { }

  ngOnInit(): void {
    console.log('on init form');
    this.user = this.activatedRoute.snapshot.data.user;
    this.isEditing = !!this.user;

    this.dictionaries$ = this.store.pipe(
      select(fromDictionaries.getDictionaries)
    );
    this.dicionariesIsReady$ = this.store.pipe(
      select(fromDictionaries.getIsReady)
    );

    this.personal$ = this.store.pipe(
      select(fromForm.getPersonalForm)
    );
    this.professional$ = this.store.pipe(
      select(fromForm.getProfessionalForm)
    );
    this.profile$ = this.store.pipe(
      select(fromForm.getFormState)
    );

    this.loading$ = this.store.pipe(
      select(fromUser.getLoading)
    );

    if (this.user) {
      const form = this.mapperService.userToForm(this.user);
      this.store.dispatch(new fromForm.Set(form));
    }

    this.stepperService.init([
      { key: 'personal', label: 'Personal' },
      { key: 'professional', label: 'Professional' },
    ]);

    this.stepperService.complete$.pipe(
      switchMap(() => zip(this.profile$, this.dictionaries$)),
      takeUntil(this.destroy)
    ).subscribe(([profile, dictionaries]) => {
        console.log('estou prestes a completar', this.user);
        this.onComplete(profile, this.user, dictionaries);

      });

    this.stepperService.cancel$
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.router.navigate(['profile', this.user?.uid]);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.store.dispatch(new fromForm.Clear());
  }

  onChangedPersonal(data: PersonalForm): void {
    this.store.dispatch(new fromForm.Update({ personal: data }))
  }
  
  onChangedProfessional(data: ProfessionalForm): void {
    this.store.dispatch(new fromForm.Update({ professional: data }))
  }

  get title(): string {
    return this.isEditing ? 'Edit Profile' : 'New Profile';
  }

  private onComplete(
    profile: ProfileForm, 
    user: fromUser.User | undefined, 
    dictionaries: fromDictionaries.Dictionaries
  ): void {
    if (this.isEditing) {
      console.log('estou editando');
      const request = this.mapperService
        .formToUserUpdate(profile, user, dictionaries);
      this.store.dispatch(new fromUser.Update(request));
    } else {
      console.log('estou criando');
      const request = this.mapperService
        .formToUserCreate(profile, dictionaries);
      this.store.dispatch(new fromUser.Create(request));
    }
  }

}
