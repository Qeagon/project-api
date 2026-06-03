import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule, NgTemplateOutlet } from '@angular/common';
import { Product } from '../product.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductActions } from '../../store/products/product.actions';
import { selectProducts, selectLoading } from '../../store/products/product.selectors';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    NgTemplateOutlet,
    AsyncPipe,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    InputNumberModule,
    ToastModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;
  loading$!: Observable<boolean>;

  editingProduct: Product | null = null;
  showCreateDialog = false;
  showEditDialog = false;

  createForm!: FormGroup;
  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private messageService: MessageService
  ) {
  this.products$ = this.store.select(selectProducts);
  this.loading$ = this.store.select(selectLoading);
  }


  ngOnInit() {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
      stock: [0, Validators.required]
    });

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
      stock: [0, Validators.required]
    });

    this.store.dispatch(ProductActions.loadProducts());
  }

  create() {
    if (this.createForm.invalid) return;
    this.store.dispatch(ProductActions.createProduct({ product: this.createForm.value }));
    this.createForm.reset({ price: 0, stock: 0 });
    this.showCreateDialog = false;
    this.messageService.add({ severity: 'success', summary: 'Product aangemaakt!' });
  }

  startEdit(product: Product) {
    this.editingProduct = { ...product };
    this.editForm.patchValue(product);
    this.showEditDialog = true;
  }

  update() {
    if (this.editForm.invalid || !this.editingProduct) return;
    this.store.dispatch(ProductActions.updateProduct({ id: this.editingProduct.id, product: this.editForm.value }));
    this.editingProduct = null;
    this.showEditDialog = false;
    this.messageService.add({ severity: 'success', summary: 'Product bijgewerkt!' });
  }

  delete(id: number) {
    this.store.dispatch(ProductActions.deleteProduct({ id }));
    this.messageService.add({ severity: 'success', summary: 'Product verwijderd!' });
  }
}
