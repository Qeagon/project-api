import { Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list';
import { ProductDetailComponent } from './products/product-detail/product-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
];