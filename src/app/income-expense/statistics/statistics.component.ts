import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  totalIncomes = 0;
  totalExpenses = 0;
  amountIncomes = 0;
  amountExpenses = 0;
  difference = 0;
  itemsSub: Subscription;

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Ingresos', 'Egresos'],
    datasets: [
      {
        data: [],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.itemsSub = this.store
      .select('incomeExpense')
      .subscribe(({ items }) => {
        this.totalExpenses = 0;
        this.totalIncomes = 0;
        this.amountExpenses = 0;
        this.amountIncomes = 0;
        items.forEach((item) => {
          if (item.type == 'Ingreso') {
            this.totalIncomes += item.amount;
            this.amountIncomes += 1;
          } else {
            this.totalExpenses += item.amount;
            this.amountExpenses += 1;
          }
        });
        this.difference = this.totalIncomes - this.totalExpenses;
        this.pieChartData.datasets = [
          {
            data: [this.totalIncomes, this.totalExpenses],
          },
        ];
      });
  }

  ngOnDestroy(): void {
    this.itemsSub.unsubscribe();
  }
}
