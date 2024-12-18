import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductsService } from '@e-commerce/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: false,

  templateUrl: './product-form.component.html',
  styles: ``,
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  // currentCategoryId: string;
  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}
  // another way to create form

  // you can use this method to create form
  ngOnInit(): void {
    // this.form = this.fb.group({
    //   name: ['', Validators.required],
    //   icon: ['', Validators.required],

    //   color: ['#fff', Validators.required],
    // });
    this._checkEditMode();

    this._initForm();
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const product: Product = {
      name: this.productForm.name.value,
      image: this.productForm.image.value,
      price: this.productForm.price.value,
      countInStock: this.productForm.countInStock.value,
      category: this.productForm.category.value,
      dateCreated: this.productForm.dateCreated.value,
    };
    if (this.editMode) {
      this._updateProduct(product);
    } else {
      this._addProudct(product);
    }
  }

  private _checkEditMode() {
    {
      this.route.params.subscribe((params) => {
        if (params.id) {
          this.editMode = true;

          this.productService.getProduct(params.id).subscribe({
            next: (product: Product) => {
              this.productForm.name.setValue(product.name);
              this.productForm.image.setValue(product.image);
              this.productForm.price.setValue(product.price);
              this.productForm.countInStock.setValue(product.countInStock);
              this.productForm.category.setValue(product.category);
              this.productForm.dateCreated.setValue(product.dateCreated);
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Product could not be loaded',
              });
            },
          });
        }
      });
    }
  }

  private _addProudct(product: Product) {
    this.productService.createProduct(product).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product is created',
        });
        timer(2000)
          .toPromise()
          .then((done) => {
            this.location.back();
          });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not created',
        });
      },
      complete: () => {
        console.log('Create product operation completed.');
      },
    });
  }
  private _updateProduct(product: Product) {
    this.route.params.subscribe((params) => {
      this.productService.editProduct(params.id, product).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product is updated',
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product is not updated',
          });
        },
        complete: () => {
          console.log('Update product operation completed.');
        },
      });
    });
  }
  // getter for form control
  get productForm() {
    return this.form.controls;
  }
  private _initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [''],
      isFeatured: [''],
    });
  }
}
