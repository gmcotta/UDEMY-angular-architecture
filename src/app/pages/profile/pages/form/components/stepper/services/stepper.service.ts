import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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

  next = new Subject<boolean>();
  next$ = new Observable<boolean>();

  prev = new Subject<void>();
  prev$ = this.prev.asObservable();

  complete = new Subject<boolean>();
  complete$ = new Observable<boolean>();

  cancel = new Subject<void>();
  cancel$ = this.cancel.asObservable();

  check = new Subject<'next' | 'complete'>();
  check$ = this.check.asObservable();

  constructor() { }

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
