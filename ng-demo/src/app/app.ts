import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  friends = ['bill', 'sue', 'jim'];

  protected readonly title = signal('ng-demo');
}
