import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { NavigationService } from '../../services/navigationService/navigation.service';

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
      name: 'Feed',
      path: '/feed',
      icon: 'home'
    },
    {
      id: 2,
      name: 'My Profile',
      path: '/profile',
      icon: 'person'
    },
    {
      id: 3,
      name: 'Notifications',
      path: '/notifications',
      icon: 'notifications'
    },
    {
      id: 4,
      name: 'Logout',
      path: '',
      icon: 'logout',
      action: 'logout'
    }
  ];

  constructor(
    private localStorageService: LocalStorageService,
    private navigationService: NavigationService
  ) {}

  handleNavClick(item: any) {
    if (item.action === 'logout') {
      this.logout();
    }
  }

  logout() {
    this.localStorageService.clear();
    this.navigationService.goTo('/');
  }
}
