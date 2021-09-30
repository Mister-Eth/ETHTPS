import { Component, Input, OnInit } from '@angular/core';
import { ThemingService } from '../services/theming.service';

@Component({
  selector: 'app-table-row-detail',
  templateUrl: './table-row-detail.component.html',
  styleUrls: ['./table-row-detail.component.scss']
})
export class TableRowDetailComponent {
  @Input() logo = '';
  @Input() infoLink = '';
  public darkMode = true;

  constructor(private themingService: ThemingService) {
    this.themingService.darkTheme.subscribe(darkTheme => {

      this.darkMode = darkTheme;
    });
  }
}
