import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { PROJECT_DATA } from './../../core/data/project.data';
import { Project } from './../../core/models/projects.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss'],
})
export class Projects {
  currentIndex = 0;
  animating = false;
  scrollDirection: 'up' | 'down' = 'down';

  // Variables para la galería
  showGallery = false;
  currentImages: string[] = [];
  currentImageIndex = 0;

  projects: Project[] = PROJECT_DATA;

  next() {
    if (this.animating || this.currentIndex >= this.projects.length - 1) return;

    this.scrollDirection = 'down';
    this.animate(() => this.currentIndex++);
  }

  prev() {
    if (this.animating || this.currentIndex <= 0) return;

    this.scrollDirection = 'up';
    this.animate(() => this.currentIndex--);
  }

  private animate(action: () => void) {
    this.animating = true;
    action();
    setTimeout(() => this.animating = false, 900);
  }

  // Métodos para la galería
  openGallery(images: string[], startIndex: number = 0) {
    this.currentImages = images;
    this.currentImageIndex = startIndex;
    this.showGallery = true;
    // Prevenir scroll del body cuando la galería está abierta
    document.body.style.overflow = 'hidden';
  }

  closeGallery(event?: Event) {
    if (event && (event.target as HTMLElement).classList.contains('gallery-content')) {
      return; // No cerrar si se hizo clic dentro del contenido
    }
    this.showGallery = false;
    document.body.style.overflow = ''; // Restaurar scroll
  }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  nextImage() {
    if (this.currentImageIndex < this.currentImages.length - 1) {
      this.currentImageIndex++;
    }
  }
isMobile = false;

ngOnInit() {
  this.checkViewport();
  window.addEventListener('resize', () => this.checkViewport());
}

checkViewport() {
  this.isMobile = window.innerWidth <= 768;
}

  // Navegación por teclado
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.showGallery) return;

    switch (event.key) {
      case 'Escape':
        this.closeGallery();
        break;
      case 'ArrowLeft':
        this.prevImage();
        event.preventDefault();
        break;
      case 'ArrowRight':
        this.nextImage();
        event.preventDefault();
        break;
    }
  }
}