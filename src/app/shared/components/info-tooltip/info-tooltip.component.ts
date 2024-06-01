import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-tooltip',
  templateUrl: './info-tooltip.component.html',
  styleUrls: ['./info-tooltip.component.scss'],
})
export class InfoTooltipComponent {
  
  /**
   * Information text to be displayed in the tooltip.
   */
  @Input() infoText?: string;
  
}
