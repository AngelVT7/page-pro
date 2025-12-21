import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Product } from '../../../core/models/product.model';
import { CommonModule } from '@angular/common';



@Component({
  standalone: true,
  selector: 'app-color-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './color-details.html',
  styleUrl: './color-details.scss',
})
export class ColorDetails {
  product$!: Observable<Product | null>;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  relatedProducts$!: Observable<Product[]>;

  ngOnInit() {
    this.product$ = this.route.paramMap.pipe(
      map(params => params.get('slug')),
      switchMap(slug =>
        this.productsService.getBySlug(slug!)
      )
    );

    this.relatedProducts$ = this.productsService.getRandom(4);
  }
  
}
