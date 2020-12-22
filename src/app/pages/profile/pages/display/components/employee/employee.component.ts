import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Employee, Recruiter } from '../../../../store/user/user.models';

@Component({
  selector: 'aa-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent implements OnInit {

  @Input() role?: Employee | Recruiter | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  get employee() {
    return this.role as Employee;
  }

}
