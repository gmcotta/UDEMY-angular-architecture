import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { StepperService } from '../stepper/services';

@Component({
  selector: 'aa-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit, OnDestroy {

  private destroy = new Subject<any>();

  constructor(
    private stepperService: StepperService,
  ) { }

  ngOnInit(): void {
    this.stepperService.check$
      .pipe(takeUntil(this.destroy), tap(() => console.log('observable check - personal')))
      .subscribe(type => this.stepperService[type].next(true));
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
