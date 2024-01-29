import { Component, EventEmitter, Input, Output } from '@angular/core';

export type DropDownItem = {
  label: string;
  value: string;
}

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})

export class DropDownComponent {
  @Input() public dropdownOptions: DropDownItem[] = [];
  @Output() public selectedOption = new EventEmitter<string>();

  public onSelectionChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedOption.emit(value);
  }
}
