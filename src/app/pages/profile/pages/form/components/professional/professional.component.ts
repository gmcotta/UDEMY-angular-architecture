import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { StepperService } from '../stepper/services';

@Component({
  selector: 'aa-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent implements OnInit, OnDestroy {

  private destroy = new Subject<any>();

  constructor(
    private stepperService: StepperService
  ) { }

  ngOnInit(): void {
    this.stepperService.check$
      .pipe(takeUntil(this.destroy), tap(() => console.log('observable check - professional')))
      .subscribe(type => this.stepperService[type].next(true));
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
