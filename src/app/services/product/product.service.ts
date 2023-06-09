import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../common/product/product';
import { ProductCategory } from '../../common/product-category/product-category';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.learnfullstackApiUrl + '/products';
  private categoryUrl = environment.learnfullstackApiUrl + '/product-category';

  constructor(private httpClient: HttpClient) {}

  getProductListPaginate(
    thePage: number,
    thePageSize: number,
    theCategoryId: number
    ): Observable<GetResponseProducts> {
      const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                           + `&page=${thePage}&size=${thePageSize}`;
      return this.httpClient.get<GetResponseProducts>(searchUrl);
    }

  getProduct(theProductId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  searchProductsPaginate(
    thePage: number,
    thePageSize: number,
    theKeyWord: string
    ): Observable<GetResponseProducts> {
      const searchUrl =
        `${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}` +
        `&page=${thePage}&size=${thePageSize}`;
      return this.httpClient.get<GetResponseProducts>(searchUrl);
    }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
