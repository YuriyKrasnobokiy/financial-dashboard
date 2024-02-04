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

  constructor(private dataService: DataService) {}

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
    combineLatest([this.dataService.getUsers(), this.issuanceDateFilter$])
      .pipe(
        map(([data, issuanceDateFilter]) => {
          this.filteredData = data.filter((item: any) => {
            const issuanceDate = new Date(item.issuance_date);
            return this.isDateInRange(issuanceDate, issuanceDateFilter);
          });
          // console.log('Data filtered:', this.filteredData);
        })
      )
      .subscribe();
  }

  updateIssuanceDateFilter(): void {
    // console.log('Filter updated');
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
}
