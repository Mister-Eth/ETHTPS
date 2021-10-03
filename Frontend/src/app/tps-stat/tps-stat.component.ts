import { Component, Input, OnInit } from '@angular/core';
import { ThemingService } from '../services/theming.service';
import { Injectable } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tps-stat',
  templateUrl: './tps-stat.component.html',
  styleUrls: ['./tps-stat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush    
})
@Injectable({
    providedIn: 'root',
  })
export class TPSStatComponent {
  public darkMode = true;
  @Input() tps: Number = 0;
  constructor(private themingService: ThemingService) {
    this.themingService.darkTheme.subscribe(darkTheme => {
      this.darkMode = darkTheme;
    });
  }
}
