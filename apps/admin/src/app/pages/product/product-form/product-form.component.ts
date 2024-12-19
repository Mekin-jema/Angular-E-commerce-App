import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CategoriesService,
  Category,
  Product,
  ProductsService,
} from '@e-commerce/products';
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
  categories: Category[] = [];
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  imageDisplay: string | ArrayBuffer;
  currentProudctId: string;
  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private categoryService: CategoriesService,
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
    this._getCategories();
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.get('image')?.value);
    const productFormData = new FormData();
    Object.keys(this.productForm).forEach((key) => {
      if (key === 'image' && this.productForm[key].value instanceof File) {
        productFormData.append(key, this.productForm[key].value);
      } else {
        productFormData.append(key, this.productForm[key].value);
      }
    });

    // productFormData.append('name', this.productForm.name.value);
    // console.log(productFormData);
    // console.log(this.productForm.name.value);
    if (this.editMode) {
      this._updateProduct(productFormData);
    } else {
      this._addProudct(productFormData);
    }
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      this.form.patchValue({ image: file }); // Update form control with the file
      this.form.get('image')?.updateValueAndValidity();

      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.result) {
          this.imageDisplay = fileReader.result; // Use base64 for preview
        }
      };
      fileReader.readAsDataURL(file);
    }
  }

  private _checkEditMode() {
    {
      this.route.params.subscribe((params) => {
        if (params.id) {
          console.log(params.id);
          this.editMode = true;

          this.productService.getProduct(params.id).subscribe({
            next: (product: Product) => {
              this.productForm.name.setValue(product.name);
              this.productForm.image.setValue(product.image);
              this.productForm.brand.setValue(product.brand);
              this.productForm.price.setValue(product.price);
              this.productForm.isFeatured.setValue(product.isFeatured);
              this.productForm.countInStock.setValue(product.countInStock);
              this.productForm.category.setValue(product.category.id);
              this.productForm.description.setValue(product.description);
              this.imageDisplay = product.image ?? '';
              this.productForm.richDescription.setValue(
                product.richDescription
              );
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

  private _addProudct(productData: FormData) {
    this.productService.createProduct(productData).subscribe({
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
  private _updateProduct(product: FormData) {
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
      description: [''],
      richDescription: ['', Validators.required],
      image: ['', Validators.required],
      isFeatured: [false],
    });
  }

  private _getCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
