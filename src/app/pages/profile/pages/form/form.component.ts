import { Component, OnInit } from '@angular/core';
import { StepperService } from './components/stepper/services';

@Component({
  selector: 'aa-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(
    public stepper: StepperService,
  ) { }

  ngOnInit(): void {
    this.stepper.init([
      { key: 'one', label: 'Step One' },
      { key: 'two', label: 'Step Two' },
      { key: 'three', label: 'Step Three' },
    ]);
  }

}