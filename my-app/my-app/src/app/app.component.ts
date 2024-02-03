import { Component, OnInit } from '@angular/core';
import { DataService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  users: string[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getUsers().subscribe((data: any[]) => {
      // Вибираємо значення ключа "user" та мапимо їх до масиву users
      this.users = data.map((item: any) => item.user);
    });
  }
}
