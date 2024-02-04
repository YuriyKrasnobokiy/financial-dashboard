import { Component, OnInit } from '@angular/core';
import { DataService } from './app.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  data: any;
  filteredData: any;
  issuanceDateFilter$ = new BehaviorSubject<{
    fromDate: Date | null;
    toDate: Date | null;
  }>({
    fromDate: null,
    toDate: null,
  });

  totalIssuedCredits: number = 0;
  overdueCredits: number = 0;
  repaidCredits: number = 0;
  averageIssuedAmount: number = 0;
  totalIssuedAmount: number = 0;
  totalInterestAmount: number = 0;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dataService.getUsers().subscribe((data: any[]) => {
      this.data = data.map((item: any) => item);
      this.calculateMetrics();
    });
  }

  applyFilters() {
    combineLatest([this.dataService.getUsers(), this.issuanceDateFilter$])
      .pipe(
        map(([data, issuanceDateFilter]) => {
          this.filteredData = data.filter((item: any) => {
            const issuanceDate = new Date(item.issuance_date);
            return this.isDateInRange(issuanceDate, issuanceDateFilter);
          });
          this.calculateMetrics();
        })
      )
      .subscribe();
  }

  updateFromDateFilter(): void {
    const fromDate = this.issuanceDateFilter$.value.fromDate || null;
    const toDate = this.issuanceDateFilter$.value.toDate || null;

    this.issuanceDateFilter$.next({ fromDate, toDate });
    this.applyFilters();
  }

  updateToDateFilter(): void {
    const fromDate = this.issuanceDateFilter$.value.fromDate || null;
    const toDate = this.issuanceDateFilter$.value.toDate || null;

    this.issuanceDateFilter$.next({ fromDate, toDate });
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

  calculateMetrics(): void {
    this.totalIssuedCredits = this.filteredData.length; // Кількість виданих кредитів

    // Розрахунок кількості прострочених та погашених кредитів
    this.overdueCredits = this.filteredData.filter(
      (item: any) => !item.actual_return_date
    ).length;

    this.repaidCredits = this.filteredData.filter(
      (item: any) => item.actual_return_date
    ).length;

    // Розрахунок середньої та загальної сум грошей виданих кредитів
    const issuedAmounts = this.filteredData.map((item: any) => item.body);
    this.averageIssuedAmount =
      issuedAmounts.reduce(
        (total: number, amount: number) => total + amount,
        0
      ) / (issuedAmounts.length || 1); // Запобігаємо діленню на нуль

    this.totalIssuedAmount = issuedAmounts.reduce(
      (total: number, amount: number) => total + amount,
      0
    );

    // Розрахунок загальної суми нарахованих відсотків
    const interestAmounts = this.filteredData.map((item: any) => item.percent);
    this.totalInterestAmount = interestAmounts.reduce(
      (total: number, amount: number) => total + amount,
      0
    );
  }
}
