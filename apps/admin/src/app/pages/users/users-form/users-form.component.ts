import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  // FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersServices } from '@e-commerce/users';

import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'app-users-form',
  standalone: false,

  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css',
})
export class UsersFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentUserId: string;
  constructor(
    private fb: FormBuilder,
    private usersServices: UsersServices,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}
  // another way to create form

  /*
  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      icon: new FormControl('', [Validators.required]),
    });
  }
   */

  // you can use this method to create form
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      isAdmin: ['', Validators.required],
      country: ['', Validators.required],
    });
    this._checkEditMode();
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      name: this.usersForm.name.value,
      email: this.usersForm.email.value,
      isAdmin: this.usersForm.isAdmin.value,
    };
    if (this.editMode) {
      this._updateUser(user);
    } else {
      this._addUser(user);
    }
  }

  private _checkEditMode() {
    {
      this.route.params.subscribe((params) => {
        if (params.id) {
          this.editMode = true;
          this.currentUserId = params.id;
          this.usersServices.getUser(params.id).subscribe({
            next: (user: User) => {
              this.usersForm.name.setValue(user.name);
              this.usersForm.email.setValue(user.email);
              this.usersForm.isAdmin.setValue(user.isAdmin);
              this.usersForm.country.setValue(user.country);
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Category could not be loaded',
              });
            },
          });
        }
      });
    }
  }

  private _addUser(user: User) {
    this.usersServices.createUser(user).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category is created',
        });
        timer(2000)
          .toPromise()
          .then((done) => {
            this.location.back();
          });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category is not created',
        });
      },
      complete: () => {
        console.log('Create user operation completed.');
      },
    });
  }
  private _updateUser(user: User) {
    this.route.params.subscribe((params) => {
      this.usersServices.editUser(params.id, user).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category is updated',
          });
          timer(2000)
            .toPromise()
            .then((done) => {
              this.location.back();
            });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'User is not updated',
          });
        },
        complete: () => {
          console.log('Update users operation completed.');
        },
      });
    });
  }
  // getter for form control
  get usersForm() {
    return this.form.controls;
  }
}
