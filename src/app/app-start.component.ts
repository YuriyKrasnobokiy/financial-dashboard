import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  template: `
    <div>
      <h1 class="home-title">
        Привіт! Це стартовий екран фінансового дашборду
      </h1>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppStartComponent implements OnInit {
  ngOnInit() {}
}
