import { Component } from '@angular/core';
import {
  faTachometerAlt,
  faBoxOpen,
  faThLarge,
  faShoppingCart,
  faUsers,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  standalone: false,

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menuItems = [
    { icon: faTachometerAlt, label: 'Dashboard', route: '/dashboard' },
    { icon: faBoxOpen, label: 'Products', route: '/products' },
    { icon: faThLarge, label: 'Categories', route: '/categories' },
    { icon: faShoppingCart, label: 'Orders', route: '/orders' },
    { icon: faUsers, label: 'Users', route: '/users' },
    { icon: faSignOutAlt, label: 'Logout', route: '/logout' },
  ];
}
