import { createFeature, createReducer, on } from '@ngrx/store';
import { Product } from '../../products/product.model';
import { ProductActions } from './product.actions';

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null
};

export const productFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    initialState,

    on(ProductActions.loadProducts, state => ({ ...state, loading: true })),
    on(ProductActions.loadProductsSuccess, (state, { products }) => ({ ...state, loading: false, products })),
    on(ProductActions.loadProductsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(ProductActions.createProductSuccess, (state, { product }) => ({
      ...state, products: [...state.products, product]
    })),

    on(ProductActions.updateProductSuccess, (state, { product }) => ({
      ...state, products: state.products.map(p => p.id === product.id ? product : p)
    })),

    on(ProductActions.deleteProductSuccess, (state, { id }) => ({
      ...state, products: state.products.filter(p => p.id !== id)
    })),
  )
});
