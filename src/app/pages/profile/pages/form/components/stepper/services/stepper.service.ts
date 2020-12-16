import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface Step {
  key: string;
  label: string;
}

export interface ActiveStep extends Step {
  index: number;
}

@Injectable()
export class StepperService {

  steps: Step[] = [];
  activeStep: ActiveStep = {} as ActiveStep;

  nextStep = new Subject<boolean>();
  nextStep$ = new Observable<boolean>();

  prevStep = new Subject<void>();
  prevStep$ = this.prevStep.asObservable();

  complete = new Subject<boolean>();
  complete$ = new Observable<boolean>();

  cancel = new Subject<void>();
  cancel$ = this.cancel.asObservable();

  check = new Subject<'nextStep' | 'complete'>();
  check$ = this.check.asObservable();

  constructor() { 
    this.nextStep$ = this.nextStep.asObservable().pipe(filter(isOk => isOk));
    this.complete$ = this.complete.asObservable().pipe(filter(isOk => isOk));
  }

  init(steps: Step[]): void {
    this.steps = steps;
    this.activeStep = { ...steps[0], index: 0 };
  }

  onNext(): void {
    const index = this.activeStep.index + 1;
    this.activeStep = { ...this.steps[index], index };
  }
  
  onPrev(): void {
    const index = this.activeStep.index - 1;
    this.activeStep = { ...this.steps[index], index };
  }
}
