import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  template: `
    <div>
      <h1 class="home-title">
        Вітання! Це стартовий екран фінансового дашборду
      </h1>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppStartComponent implements OnInit {
  ngOnInit() {}
}
