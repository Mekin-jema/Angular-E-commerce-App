import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersServices, User } from '@e-commerce/users';

import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-users-list',
  standalone: false,

  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  // constructor() {}
  constructor(
    private usersServices: UsersServices,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getUsers();
  }
  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this User?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersServices.deleteUser(userId).subscribe({
          next: () => {
            this._getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User has been deleted',
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'User could not be deleted',
            });
          },
        });
      },
      reject: () => {},
    });
  }
  editUser(UserId: string) {
    this.router.navigateByUrl(`users/form/${UserId}`);
  }

  private _getUsers() {
    this.usersServices.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
