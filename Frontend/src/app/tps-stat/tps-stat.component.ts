import { Component, Input, OnInit } from '@angular/core';
import { ThemingService } from '../services/theming.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-tps-stat',
  templateUrl: './tps-stat.component.html',
  styleUrls: ['./tps-stat.component.scss']
})
@Injectable({
    providedIn: 'root',
  })
export class TPSStatComponent {
  @Input() logo = '';
  @Input() infoLink = '';
  public darkMode = true;
  public tps: Number = 0;
  constructor(private themingService: ThemingService) {
    this.themingService.darkTheme.subscribe(darkTheme => {
      this.darkMode = darkTheme;
    });
  }
}
