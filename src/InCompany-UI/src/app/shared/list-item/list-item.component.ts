import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ListItem = {
  text: string;
  icon: any;
  ideaId?: string;
  warning?: boolean;
};

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input() public iconLeft?: any;
  @Input() public iconRight?: any;
  @Input() public className!: string;
  @Input() public text!: any;
  @Input() public warning?: boolean = false;
  @Output() public onClick = new EventEmitter();
}
