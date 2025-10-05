import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'entity-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  template: `
    <table mat-table [dataSource]="data" class="mat-elevation-z1 w-100">

      <ng-container *ngFor="let col of columns" [matColumnDef]="col.key">
        <th mat-header-cell *matHeaderCellDef>{{ col.label }}</th>
        <td mat-cell *matCellDef="let row">{{ row[col.key] }}</td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Acciones</th>
        <td mat-cell *matCellDef="let row">
          <button mat-button color="primary" *ngIf="canEdit" (click)="edit.emit(row)">Editar</button>
          <button mat-button color="warn" *ngIf="canDelete" (click)="delete.emit(row)">Eliminar</button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columnKeys"></tr>
      <tr mat-row *matRowDef="let row; columns: columnKeys"></tr>
    </table>
  `,
  styles: [`
    .w-100 { width: 100%; }
    table { background: #fff; }
    th, td { min-width: 120px; }
  `]
})
export class EntityListComponent {
  @Input() columns: { key: string, label: string }[] = [];
  @Input() data: any[] = [];
  @Input() canEdit = false;
  @Input() canDelete = false;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  get columnKeys() {
    return [...this.columns.map(c => c.key), 'actions'];
  }
}
