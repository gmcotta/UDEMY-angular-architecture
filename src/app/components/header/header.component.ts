import { 
  ChangeDetectionStrategy, 
  Component, 
  Input, 
  OnInit, 
  Output, 
  EventEmitter 
} from '@angular/core';

@Component({
  selector: 'aa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input() isAuthorized: boolean | null = false;
  @Output() signOut = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSignOut(): void {
    this.signOut.emit();
  }
}
