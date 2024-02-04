import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from './app.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  template: `
    <div class="container">
      <div class="filter-wrap">
        <div class="filter">
          <p>Фільтр періоду дат видачі кредиту</p>
          <input type="date" #fromIssuanceDate />
          <input type="date" #toIssuanceDate />
          <button
            (click)="
              applyFilters(
                'issuance',
                fromIssuanceDate.value,
                toIssuanceDate.value
              )
            "
          >
            Застосувати фільтр
          </button>
        </div>

        <div class="filter">
          <p>Фільтр періоду дат повернення кредиту</p>
          <input type="date" #fromReturnDate />
          <input type="date" #toReturnDate />
          <button
            (click)="
              applyFilters('return', fromReturnDate.value, toReturnDate.value)
            "
          >
            Застосувати фільтр
          </button>
        </div>

        <div class="filter">
          <p>Фільтр прострочених кредитів</p>
          <input type="date" #fromOverdueDate />
          <input type="date" #toOverdueDate />
          <button
            (click)="
              applyFilters(
                'overdue',
                fromOverdueDate?.valueAsDate?.toISOString(),
                toOverdueDate?.valueAsDate?.toISOString()
              )
            "
          >
            Застосувати фільтр
          </button>
        </div>
      </div>

      <table class="table" border="1">
        <thead>
          <tr>
            <th>Клієнт</th>
            <th>Дата видачі кредиту</th>
            <th>Дата погашення кредиту</th>
            <th>Фактична дата погашення кредиту</th>
            <th>Тіло кредиту (грн)</th>
            <th>Відсоток (грн)</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of filteredData">
            <td>{{ item.user }}</td>
            <td>{{ item.issuance_date }}</td>
            <td>{{ item.return_date }}</td>
            <td>{{ item.actual_return_date }}</td>
            <td>{{ item.body }}</td>
            <td>{{ item.percent }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppTableComponent implements OnInit {
  data: any;
  filteredData: any[] = [];

  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dataService.getUsers().subscribe((data: any[]) => {
      this.data = data.map((item: any) => item);
      this.applyFilters();
    });
  }

  applyFilters(type?: string, fromDate?: string, toDate?: string): void {
    if (this.data) {
      this.filteredData = this.data.filter((item: any) => {
        const issuanceDate = new Date(item.issuance_date);
        const returnDate = new Date(item.return_date);
        const currentDate = new Date();
        const actualReturnDate = item.actual_return_date
          ? new Date(item.actual_return_date)
          : null;

        switch (type) {
          case 'issuance':
            return this.isDateInRange(issuanceDate, {
              fromDate: fromDate ? new Date(fromDate) : null,
              toDate: toDate ? new Date(toDate) : null,
            });

          case 'return':
            return this.isDateInRange(returnDate, {
              fromDate: fromDate ? new Date(fromDate) : null,
              toDate: toDate ? new Date(toDate) : null,
            });

          case 'overdue':
            return (
              (actualReturnDate && actualReturnDate > returnDate) ||
              (!actualReturnDate && returnDate < currentDate)
            );

          default:
            return true;
        }
      });

      this.cdr.detectChanges();
    }
  }

  isDateInRange(
    date: Date,
    range: { fromDate: Date | null; toDate: Date | null }
  ): boolean {
    if (!date || !range.fromDate || !range.toDate) {
      return true;
    }
    return date >= range.fromDate && date <= range.toDate;
  }
}
