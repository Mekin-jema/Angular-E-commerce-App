import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  // FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoriesService, Category } from '@e-commerce/products';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-categories-form',
  standalone: false,

  templateUrl: './categories-form.component.html',
  styles: ``,
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService
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
      icon: ['', Validators.required],
      // color: [''],
    });
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
    };
    this.categoriesService.createCategory(category).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category is created',
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
        console.log('Create category operation completed.');
      },
    });
  }

  // getter for form control
  get categoryForm() {
    return this.form.controls;
  }
}
