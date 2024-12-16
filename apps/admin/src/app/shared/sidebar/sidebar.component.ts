import { Component } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  standalone: false,

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menuItems = [
    { icon: 'pi pi-home', label: 'Dashboard', route: '/dashboard' },
    { icon: 'pi pi-box', label: 'Products', route: '/products' },
    { icon: 'pi pi-th-large', label: 'Categories', route: '/categories' },
    { icon: 'pi pi-shopping-cart', label: 'Orders', route: '/orders' },
    { icon: 'pi pi-users', label: 'Users', route: '/users' },
    { icon: 'pi pi-sign-out', label: 'Logout', route: '/logout' },
  ];
}
