import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MediaMatcher} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ThemingService } from './services/theming.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav?: MatSidenav;
  @ViewChild('light-theme-icon') darkThemeIcon?: MatIcon;

  public title = 'ethtps.info';

  private _mobileQueryListener: () => void;
  public mobileQuery: MediaQueryList;

  public darkTheme = true;

  constructor(changeDetectorRef: ChangeDetectorRef, 
              media: MediaMatcher,
              public dialog: MatDialog, 
              private themingService: ThemingService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);    
  }

  public sidenavItemClicked() {
    if (this.mobileQuery.matches)
      this.sidenav?.close(); 
  }

  onThemeChange(event: any) {
    this.darkTheme=!this.darkTheme;
    this.themingService.darkTheme.next(this.darkTheme);

    if (!this.darkTheme) {
      document.body.classList.remove("dark-theme");
    }
    else {
      document.body.classList.add("dark-theme");
    }
  }
}
