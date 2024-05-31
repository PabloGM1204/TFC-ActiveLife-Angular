import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-tooltip',
  templateUrl: './info-tooltip.component.html',
  styleUrls: ['./info-tooltip.component.scss'],
})
export class InfoTooltipComponent {
  
  /**
   * Texto de información que se mostrará en el tooltip.
   */
  @Input() infoText?: string;
  
}
