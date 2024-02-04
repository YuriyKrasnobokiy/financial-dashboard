import { Component, OnInit } from '@angular/core';
import { DataService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  data: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getUsers().subscribe((data: any[]) => {
      // Вибираємо значення ключа "user" та мапимо їх до масиву users
      this.data = data.map((item: any) => item);
    });
  }
}
