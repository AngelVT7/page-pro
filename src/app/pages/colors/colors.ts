import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { CategoryFilter, Product } from '../../core/models/product.model';

@Component({
  standalone: true,
  selector: 'app-colors',
  imports: [CommonModule, RouterModule],
  templateUrl: './colors.html',
  styleUrl: './colors.scss',
})
export class Colors {

  selectedCategory: string | null = null;
selectedColorTag: string | null = null;

  categories: CategoryFilter[] = [
  {
    key: 'ACM Architectural Set',
    label: 'Architectural Set',
    image: 'assets/categories/ACM-Architectural-Set-150x150.png',
  },
  {
    key: 'ACM City Set',
    label: 'City Set',
    image: 'assets/categories/ACM-City-Set-150x150.png',
  },
  {
    key: 'ACM Colorful Set',
    label: 'Colorful Set',
    image: 'assets/categories/ACM-Colorful-Set-150x150.png',
  },
  {
    key: 'ACM Energy Set',
    label: 'Energy Set',
    image: 'assets/categories/ACM-Energy-Set-150x150.png',
  },
  {
    key: 'ACM Industrial Set',
    label: 'Industrial Set',
    image: 'assets/categories/ACM-Industrial-Set-150x150.png',
  },
  {
    key: 'ACM Inspiration Set',
    label: 'Inspiration Set',
    image: 'assets/categories/ACM-Inspiration-set-150x150.png',
  },
  {
    key: 'ACM Mirror Set',
    label: 'Mirror Set',
    image: 'assets/categories/ACM-Mirror-Set-150x150.png',
  },
  {
    key: 'ACM Mobility Set',
    label: 'Mobility Set',
    image: 'assets/categories/ACM-Mobility-Set-150x150.png',
  },
  {
    key: 'ACM Signage Set',
    label: 'Signage Set',
    image: 'assets/categories/ACM-Signage-Set-150x150.png',
  },
  {
    key: 'ACM Stone Set',
    label: 'Stone Set',
    image: 'assets/categories/ACM-Stone-Set-150x150.png',
  },
  {
    key: 'ACM Woods Set',
    label: 'Woods Set',
    image: 'assets/categories/ACM-Woods-Set-150x150.png',
  },
];

filterByCategory(categoryKey: string) {
  this.selectedCategory =
    this.selectedCategory === categoryKey ? null : categoryKey;

  this.currentPage = 1;
  this.applyFilters();
}
filterByColorTag(color: string) {
  this.selectedColorTag =
    this.selectedColorTag === color ? null : color;

  this.currentPage = 1;
  this.applyFilters();
}

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
  colorTags= ['SD', 'NS']

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
  this.selectedCategory = null;
  this.selectedColorTag = null;
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

if (this.selectedColorTag) {
  filtered = filtered.filter(
    p => p.colorTag?.includes(this.selectedColorTag!)
  );
}

  if (this.selectedCategory) {
    filtered = filtered.filter(
      p => p.categories?.includes(this.selectedCategory!)
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
