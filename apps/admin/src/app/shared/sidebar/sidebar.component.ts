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
    { icon: faTachometerAlt, label: 'Dashboard' },
    { icon: faBoxOpen, label: 'Products' },
    { icon: faThLarge, label: 'Categories' },
    { icon: faShoppingCart, label: 'Orders' },
    { icon: faUsers, label: 'Users' },
    { icon: faSignOutAlt, label: 'Logout' },
  ];
}
