import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { chains } from '../common/chain-metadata';
import { Chain } from '../common/common-classes';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ThemingService } from '../services/theming.service';

@Component({
  selector: 'app-selection-table',
  templateUrl: './selection-table.component.html',
  styleUrls: ['./selection-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SelectionTableComponent {
  @Input() public selectionDisabled = false;
  public chains: Chain[] = chains;
  @Output() selectionChanged = new EventEmitter<Chain[]>();
  public selection: SelectionModel<Chain>;
  public columnsToDisplay = ['select', 'name', 'type'];
  public expandedElement: Chain | null = null;
  public darkMode = true;

  constructor(private themingService: ThemingService) {
    this.selection = new SelectionModel<Chain>(true, chains); // initially select all chains

    this.themingService.darkTheme.subscribe(darkTheme => {
      this.darkMode = darkTheme;
    });

    this.selection.changed.subscribe(selection => {
      this.selectionChanged.emit(selection.source.selected);
    });
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.chains);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.chains.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  public checkboxLabel(row?: Chain): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
  }
}
