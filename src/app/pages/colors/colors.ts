import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { Observable } from 'rxjs';

import { Product } from '../../core/models/product.model';
import { ProductsService } from '../../core/services/products.service';

@Component({
  standalone: true,
  selector: 'app-colors',
  imports: [RouterModule, CommonModule],
  templateUrl: './colors.html',
  styleUrl: './colors.scss',
})
export class Colors {
  // lista principal
  products$!: Observable<Product[]>;

  // filtros activos (opcional)
  selectedBrand: string | null = null;
  selectedColor: string | null = null;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.loadAll();
  }


  // CARGA GENERAL
  // =========================
  loadAll() {
    this.products$ = this.productsService.getAll();
  }

  // FILTROS
  // =========================
  filterByBrand(brand: string) {
    this.selectedBrand = brand;
    this.products$ = this.productsService.filterByBrand(brand);
  }

  filterByColor(tag: string) {
    this.selectedColor = tag;
    this.products$ = this.productsService.filterByColor(tag);
  }

  clearFilters() {
    this.selectedBrand = null;
    this.selectedColor = null;
    this.loadAll();
  }
  //modal
  activeProduct: Product | null = null;

  openModal(product: Product) {
    this.activeProduct = product;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.activeProduct = null;
    document.body.style.overflow = '';
  }

}
