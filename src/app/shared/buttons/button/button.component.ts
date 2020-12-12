import { Component, Input, OnInit } from '@angular/core';

type ButtonType = 'button' | 'submit';

@Component({
  selector: 'aa-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() type: ButtonType = 'button';

  constructor() { }

  ngOnInit(): void {
  }

}
