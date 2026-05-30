import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    InputNumberModule,
    ToastModule,
    RouterModule,
    
  ],
  providers: [MessageService],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  newProduct: Partial<Product> = {};
  editingProduct: Product | null = null;
  showCreateDialog = false;
  showEditDialog = false;

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe(response => {
      this.products = response.data;
      this.cdr.detectChanges();
    });
  }

  create() {
    this.productService.create(this.newProduct).subscribe(() => {
      this.newProduct = {};
      this.showCreateDialog = false;
      this.loadProducts();
      this.messageService.add({ severity: 'success', summary: 'Product aangemaakt!' });
    });
  }

  startEdit(product: Product) {
    this.editingProduct = { ...product };
    this.showEditDialog = true;
  }

  update() {
    if (!this.editingProduct) return;
    this.productService.update(this.editingProduct.id, this.editingProduct).subscribe(() => {
      this.editingProduct = null;
      this.showEditDialog = false;
      this.loadProducts();
      this.messageService.add({ severity: 'success', summary: 'Product bijgewerkt!' });
    });
  }

  delete(id: number) {
    this.productService.delete(id).subscribe(() => {
      this.loadProducts();
      this.messageService.add({ severity: 'success', summary: 'Product verwijderd!' });
    });
  }
}