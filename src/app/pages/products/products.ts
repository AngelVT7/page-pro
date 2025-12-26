import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
    constructor(private router: Router) {}
  goToBrand(brand: string) {
  this.router.navigate(['/colors'], {
    queryParams: { brand }
  });
}


}
