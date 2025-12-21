import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  isScrolled = false;
  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 80;
  }
}
