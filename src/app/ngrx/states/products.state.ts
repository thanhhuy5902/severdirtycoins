import { Products } from 'src/app/models/products.model';

export interface ProductsState {
  productList: Products[];
  isLoading: boolean;
  isSuccess: boolean;
  error: any;
}