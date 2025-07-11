import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

   navTools = [
    {
      id: 1,
      name: "Expense Tracker",
      path: "/expense-tracker"
    },
    {
      id: 2,
      name: "About",
      path: "/about"
    },
    {
      id: 3,
      name: "Contact",
      path: "/contact"
    },
    {
      id: 4,
      name: "Logout",
      path: "/landing-page"
    },
    {id: 5,
      name: "Dashboard",
      path: "/dashboard"
    }
  ]
}
