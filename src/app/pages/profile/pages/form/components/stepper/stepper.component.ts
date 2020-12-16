import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StepperService } from './services';

@Component({
  selector: 'aa-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit, OnDestroy {

  private destroy = new Subject<any>();

  constructor(private stepperService: StepperService) { }

  ngOnInit(): void {
    this.stepperService.nextStep$
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this.stepperService.onNext());
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  get steps() {
    return this.stepperService.steps;
  }

  get activeStep() {
    return this.stepperService.activeStep;
  }

  isActive(index: number): boolean {
    return index === this.activeStep.index;
  }

  isCompleted(index: number): boolean {
    return index < this.activeStep.index;
  }

  isFirst(): boolean {
    return this.activeStep.index === 0;
  }

  isLast(): boolean {
    return this.activeStep.index === this.steps.length - 1;
  }

  onCancel() {
    console.log('stepper oncancel');
    this.stepperService.cancel.next();
  }

  onPrev() {
    console.log('stepper onprev');
    this.stepperService.onPrev();
  }

  onNext() {
    console.log('stepper onnext');
    this.stepperService.check.next('nextStep');
  }

  onComplete() {
    console.log('stepper oncomplete');
    this.stepperService.check.next('complete');
  }


}
