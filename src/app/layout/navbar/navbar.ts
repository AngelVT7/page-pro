import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  isMobileOpen = false;
  isScrolled = false;
  isAtTop = true;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isAtTop = window.scrollY < 50;
  }

  menu = [
    { label: 'Home', route: '/' },
    { label: 'About', route: '/about' },
    { label: 'Products', route: '/products' },
    { label: 'Technical Specs', route: '/technical-especifications' },
    { label: 'Colors', route: '/colors' },
    { label: 'Projects', route: '/projects' },
    { label: 'Downloads', route: '/downloads' },
    { label: 'Distributors', route: '/distributors-sales-rep' },
    { label: 'VR Tour', route: '/vrtour' },
    { label: 'News', route: '/news' },
  ];

  toggleMobile() {
    this.isMobileOpen = !this.isMobileOpen;
    document.body.style.overflow = this.isMobileOpen ? 'hidden' : '';
  }

  closeMobile() {
    this.isMobileOpen = false;
    document.body.style.overflow = '';
  }
}
