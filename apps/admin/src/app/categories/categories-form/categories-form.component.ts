import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  // FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@e-commerce/products';

import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'app-categories-form',
  standalone: false,

  templateUrl: './categories-form.component.html',
  styles: ``,
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryId: string;
  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
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
      icon: ['', Validators.required],
      // color: [''],
    });
    this._checkEditMode();
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      // id: this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
    };
    if (this.editMode) {
      // this._updateCategory(category);
    } else {
      this._addCategory(category);
    }
  }

  private _checkEditMode() {
    {
      this.route.params.subscribe((params) => {
        if (params.id) {
          this.editMode = true;
          this.currentCategoryId = params.id;
          this.categoriesService.getCategory(params.id).subscribe({
            next: (category: Category) => {
              this.categoryForm.name.setValue(category.name);
              this.categoryForm.icon.setValue(category.icon);
            },
            error: (error) => {
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

  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe({
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
        console.log('Create category operation completed.');
      },
    });
  }

  // private _updateCategory(category: Category) {
  //   this.route.params.subscribe((params) => {
  //     this.categoriesService.updateCategory(params.id, category).subscribe({
  //       next: (response) => {
  //         this.messageService.add({
  //           severity: 'success',
  //           summary: 'Success',
  //           detail: 'Category is updated',
  //         });
  //         timer(2000)
  //           .toPromise()
  //           .then((done) => {
  //             this.location.back();
  //           });
  //       },
  //       error: (error) => {
  //         this.messageService.add({
  //           severity: 'error',
  //           summary: 'Error',
  //           detail: 'Category is not updated',
  //         });
  //       },
  //       complete: () => {
  //         console.log('Update category operation completed.');
  //       },
  //     });
  //   });
  // }
  // getter for form control
  get categoryForm() {
    return this.form.controls;
  }
}
