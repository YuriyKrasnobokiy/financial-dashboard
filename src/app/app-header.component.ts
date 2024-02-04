import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <nav class="navigation">
        <a class="nav-link" routerLink="/" routerLinkActive="active">Головна</a>
        <a class="nav-link" routerLink="/statistics" routerLinkActive="active"
          >Статистика</a
        >
        <a class="nav-link" routerLink="/table" routerLinkActive="active"
          >Таблиця</a
        >
      </nav>
    </header>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppHeaderComponent {}
