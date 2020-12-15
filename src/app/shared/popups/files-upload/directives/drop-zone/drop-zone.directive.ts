import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[aaDropZone]'
})
export class DropZoneDirective {

  @Output() dropped = new EventEmitter<any>();
  @Output() hovered = new EventEmitter<boolean>();

  constructor() { }

  @HostListener('drop', ['$event'])
  onDrop($event: DragEvent): void {
    $event.preventDefault();
    const files = $event.dataTransfer?.files;
    this.dropped.emit(files);
    this.hovered.emit(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event: Event): void {
    $event.preventDefault();
    this.hovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event: Event): void {
    $event.preventDefault();
    this.hovered.emit(false);
  }

}
