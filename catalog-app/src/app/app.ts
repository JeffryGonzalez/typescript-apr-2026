import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_SECTIONS } from './shared/nav-config';
import { required, minLength } from '@hypertheory-labs/validation-lib';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-base-200">
      <div class="navbar bg-base-100 shadow-sm">
        <div class="flex-1">
          <a class="btn btn-ghost text-xl" routerLink="/">Software Catalog</a>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal px-1">
            @for (section of sections; track section.path) {
              <li>
                <a
                  [routerLink]="section.path"
                  routerLinkActive="bg-base-200"
                  [routerLinkActiveOptions]="{ exact: section.path === '/catalog' }"
                >
                  {{ section.label }}
                </a>
              </li>
            }
          </ul>
        </div>
      </div>

      <main>
        <router-outlet />
      </main>
    </div>
  `,
})
export class App {
  sections = NAV_SECTIONS;


  constructor() {
    console.log(required('dog'));
    const r2 = minLength(3);
    // console.log(r2());
  }

}
