import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ProductService } from '../../products/product.service';
import { ProductActions } from './product.actions';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() => this.productService.getAll().pipe(
        map(response => ProductActions.loadProductsSuccess({ products: response.data })),
        catchError(error => of(ProductActions.loadProductsFailure({ error: error.message })))
      ))
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProduct),
      mergeMap(({ product }) => this.productService.create(product).pipe(
        map(product => ProductActions.createProductSuccess({ product })),
        catchError(error => of(ProductActions.createProductFailure({ error: error.message })))
      ))
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap(({ id, product }) => this.productService.update(id, product).pipe(
        map(product => ProductActions.updateProductSuccess({ product })),
        catchError(error => of(ProductActions.updateProductFailure({ error: error.message })))
      ))
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap(({ id }) => this.productService.delete(id).pipe(
        map(() => ProductActions.deleteProductSuccess({ id })),
        catchError(error => of(ProductActions.deleteProductFailure({ error: error.message })))
      ))
    )
  );
}
