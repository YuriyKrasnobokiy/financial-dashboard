import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppStartComponent } from './app-start.component';
import { AppStatisticsComponent } from './app-statistics.component';
import { AppTableComponent } from './app-table.component';
import { AppHeaderComponent } from './app-header.component';
import { DataService } from './app.service';

const appRoutes: Routes = [
  { path: '', component: AppStartComponent },
  { path: 'statistics', component: AppStatisticsComponent },
  { path: 'table', component: AppTableComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppStartComponent,
    AppStatisticsComponent,
    AppTableComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), HttpClientModule],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
