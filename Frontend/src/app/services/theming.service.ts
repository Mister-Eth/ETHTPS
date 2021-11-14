import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemingService {
    public darkTheme : ReplaySubject<boolean> = new ReplaySubject(1);
    constructor () {
        this.darkTheme.next(true);
    }
}