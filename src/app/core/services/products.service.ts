import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { PRODUCTS_DATA } from '../data/product.data';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class ProductsService {

  getAll(): Observable<Product[]> {
    return of(PRODUCTS_DATA);
  }

  getBySlug(slug: string): Observable<Product | null> {
    const product = PRODUCTS_DATA.find(p => p.slug === slug) ?? null;
    return of(product);
  }

  filterByBrand(brand: string): Observable<Product[]> {
    return of(PRODUCTS_DATA.filter(p => p.brand === brand));
  }

  filterByColor(tag: string): Observable<Product[]> {
    return of(PRODUCTS_DATA.filter(p => p.colorTag.includes(tag)));
  }

  getRandom(limit = 4): Observable<Product[]> {
  return of(PRODUCTS_DATA)
    .pipe(
      map(list =>
        [...list]
          .sort(() => 0.5 - Math.random())
          .slice(0, limit)
      )
    );
}

}
