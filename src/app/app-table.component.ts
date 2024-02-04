import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from './app.service';
import { BehaviorSubject, combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'app-table',
  template: `
    <div class="container">
      <div class="filter-wrap">
        <div class="filter">
          <p>Фільтр періоду дат видачі кредиту</p>
          <input type="date" (change)="updateFromDateFilter()" />
          <input type="date" (change)="updateToDateFilter()" />
        </div>

        <div class="filter">
          <p>Фільтр періоду дат повернення кредиту</p>
          <input type="date" />
          <input type="date" />
        </div>

        <div class="filter">
          <p>Фільтр прострочених кредитів</p>
          <input type="date" />
          <input type="date" />
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
  issuanceDateFilter$ = new BehaviorSubject<{
    fromDate: Date | null;
    toDate: Date | null;
  }>({
    fromDate: null,
    toDate: null,
  });

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

  applyFilters() {
    combineLatest([this.issuanceDateFilter$])
      .pipe(
        map(([issuanceDateFilter]) => {
          this.filteredData = this.data.filter((item: any) => {
            const issuanceDate = new Date(item.issuance_date);
            return this.isDateInRange(issuanceDate, issuanceDateFilter);
          });
        })
      )
      .subscribe(() => {
        this.cdr.detectChanges();
      });
  }

  updateFromDateFilter(): void {
    this.applyFilters();
  }

  updateToDateFilter(): void {
    this.applyFilters();
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
