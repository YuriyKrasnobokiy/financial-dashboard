import { Component, OnInit } from '@angular/core';
import { DataService } from './app.service';

@Component({
  selector: 'app-statistics',
  template: `
    <div class="statistic">
      <p class="stat-text">
        Загальна кількість виданих кредитів: {{ totalIssuedCredits }}
      </p>
      <p class="stat-text">
        Кількість прострочених кредитів: {{ overdueCredits }}
      </p>
      <p class="stat-text">Кількість погашених кредитів: {{ repaidCredits }}</p>
      <p class="stat-text">
        Середня сума видачі кредитів:
        {{ averageIssuedAmount | number : '1.2-2' }} грн
      </p>
      <p class="stat-text">
        Загальна сума виданих кредитів:
        {{ totalIssuedAmount }} грн
      </p>
      <p class="stat-text">
        Загальна сума нарахованих відсотків:
        {{ totalInterestAmount }} грн
      </p>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppStatisticsComponent implements OnInit {
  totalIssuedCredits: number = 0;
  overdueCredits: number = 0;
  repaidCredits: number = 0;
  averageIssuedAmount: number = 0;
  totalIssuedAmount: number = 0;
  totalInterestAmount: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getUsers().subscribe((data: any[]) => {
      // Розрахунок загальної кількості виданих кредитів
      this.totalIssuedCredits = data.length;

      // Розрахунок кількості прострочених та погашених кредитів
      this.overdueCredits = data.filter(
        (item: any) => !item.actual_return_date
      ).length;
      this.repaidCredits = data.filter(
        (item: any) => !!item.actual_return_date
      ).length;

      // Розрахунок середньої та загальної сум грошей виданих кредитів
      const issuedAmounts = data.map((item: any) => item.body);
      this.averageIssuedAmount =
        issuedAmounts.reduce(
          (total: number, amount: number) => total + amount,
          0
        ) / (issuedAmounts.length || 1);
      this.totalIssuedAmount = issuedAmounts.reduce(
        (total: number, amount: number) => total + amount,
        0
      );

      // Розрахунок загальної суми нарахованих відсотків
      const interestAmounts = data.map((item: any) => item.percent);
      this.totalInterestAmount = interestAmounts.reduce(
        (total: number, amount: number) => total + amount,
        0
      );
    });
  }
}
