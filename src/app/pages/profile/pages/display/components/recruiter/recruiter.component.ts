import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Recruiter, Employee } from '../../../../store/user/user.models';

@Component({
  selector: 'aa-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecruiterComponent implements OnInit {

  @Input() role?: Recruiter | Employee;

  constructor() { }

  ngOnInit(): void {
  }

  get recruiter() {
    return this.role as Recruiter;
  }

}
