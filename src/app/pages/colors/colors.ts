import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.model';

@Component({
  standalone: true,
  selector: 'app-colors',
  imports: [CommonModule, RouterModule],
  templateUrl: './colors.html',
  styleUrl: './colors.scss',
})
export class Colors {

  // =====================
  // SERVICES
  // =====================
  private productsService = inject(ProductsService);

  // =====================
  // DATA
  // =====================
  products: Product[] = [];
  pagedProducts: Product[] = [];
  colors: { tag: string; name: string; image: string }[] = [];


  // =====================
  // FILTER STATE
  // =====================
  selectedBrand: string | null = null;
  selectedColor: string | null = null;

  brands = ['Alucargo', 'Alucomex', 'Alusign', 'Alutec'];

  colorsF = [
    { tag: 'architectural', name: 'Architectural', image: '/assets/colors/arch.jpg' },
    { tag: 'city', name: 'City Set', image: '/assets/colors/city.jpg' },
    { tag: 'colorful', name: 'Colorful', image: '/assets/colors/colorful.jpg' },
    { tag: 'energy', name: 'Energy', image: '/assets/colors/energy.jpg' },
  ];

  // =====================
  // PAGINATION
  // =====================
  currentPage = 1;
  pageSize = 8;
  pages: number[] = [];

  // =====================
  // MODAL
  // =====================
  activeProduct: Product | null = null;

  // =====================
  // INIT
  // =====================
ngOnInit() {
  this.productsService.getAll().subscribe(products => {
    this.products = products;

    this.buildColorFilters(products);
    this.applyFilters();
  });
}
private buildColorFilters(products: Product[]) {
  const map = new Map<string, { tag: string; name: string; image: string }>();

  products.forEach(p => {
    const tags = p['colorTag'] as string[];

    tags?.forEach(tag => {
      if (!map.has(tag)) {
        map.set(tag, {
          tag,
          name: tag.replace(/-/g, ' ').toUpperCase(),
          image: `/assets/colors/${tag}.jpg` // ajusta ruta
        });
      }
    });
  });

  this.colors = Array.from(map.values());
}


  // =====================
  // FILTER LOGIC
  // =====================
  filterByBrand(brand: string) {
    this.selectedBrand = brand;
    this.currentPage = 1;
    this.applyFilters();
  }

  filterByColor(color: string) {
    this.selectedColor = color;
    this.currentPage = 1;
    this.applyFilters();
  }

  clearFilters() {
    this.selectedBrand = null;
    this.selectedColor = null;
    this.currentPage = 1;
    this.applyFilters();
  }

private applyFilters() {
  let filtered = [...this.products];

  if (this.selectedBrand) {
    filtered = filtered.filter(
      p => p.brand === this.selectedBrand
    );
  }

  if (this.selectedColor) {
    filtered = filtered.filter(
      p => (p['colorTag'] as string[])?.includes(this.selectedColor!)
    );
  }

  this.updatePagination(filtered);
}


  // =====================
  // PAGINATION LOGIC
  // =====================
  private updatePagination(list: Product[]) {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.pagedProducts = list.slice(start, end);

    this.pages = Array.from(
      { length: Math.ceil(list.length / this.pageSize) },
      (_, i) => i + 1
    );
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.applyFilters();
  }

  // =====================
  // MODAL
  // =====================
  openModal(product: Product) {
    this.activeProduct = product;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.activeProduct = null;
    document.body.style.overflow = '';
  }
}
