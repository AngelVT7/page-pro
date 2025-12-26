import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss'],
})
export class Projects implements AfterViewInit, OnDestroy {

  @ViewChild('slide', { static: true }) slide!: ElementRef<HTMLElement>;
  imageInterval: any = null;
  currentActiveSlide!: HTMLElement;

  ngAfterViewInit(): void {
    const items = Array.from(this.slide.nativeElement.querySelectorAll<HTMLElement>('.item'));
    if (items.length === 0) return;

    // Supón que el slide visible es el primero (o el que tenga contenido mostrado por CSS)
    // Pero mejor: usa el que está en la posición "central" tras el prepend/append
    // En tu CSS, el item:nth-child(2) es el visible → así que usamos items[1] si existe
    const initialSlide = items.length > 1 ? items[1] : items[0];
    this.setActiveSlide(initialSlide);
  }
  setActiveSlide(slideElement: HTMLElement): void {
  // 👇 1. LIMPIA el active del slide ANTERIOR (si existe)
  if (this.currentActiveSlide) {
    const oldImages = this.currentActiveSlide.querySelectorAll<HTMLImageElement>('.image img');
    oldImages.forEach(img => img.classList.remove('active'));
  }

  // 👇 2. Detén el intervalo anterior
  if (this.imageInterval) {
    clearInterval(this.imageInterval);
    this.imageInterval = null;
  }

  // 👇 3. Guarda el nuevo slide como activo
  this.currentActiveSlide = slideElement;

  const images = Array.from(slideElement.querySelectorAll<HTMLImageElement>('.image img'));
  if (images.length === 0) return;

  // 👇 4. Activa la primera imagen
  images.forEach(img => img.classList.remove('active')); // por si acaso
  images[0].classList.add('active');

  // 👇 5. Si hay más de una, inicia rotación
  if (images.length > 1) {
    let index = 0;
    this.imageInterval = setInterval(() => {
      images.forEach(img => img.classList.remove('active'));
      index = (index + 1) % images.length;
      images[index].classList.add('active');
    }, 3000);
  }
}

  ngOnDestroy(): void {
    if (this.imageInterval) {
      clearInterval(this.imageInterval);
    }
  }

  next(): void {
    const items = Array.from(this.slide.nativeElement.querySelectorAll<HTMLElement>('.item'));
    if (items.length <= 1) return;

    const first = items[0];
    this.slide.nativeElement.appendChild(first);

    // El nuevo slide activo es ahora el segundo (índice 1)
    const newActive = this.slide.nativeElement.querySelectorAll<HTMLElement>('.item')[1];
    this.setActiveSlide(newActive);
  }

  prev(): void {
    const items = Array.from(this.slide.nativeElement.querySelectorAll<HTMLElement>('.item'));
    if (items.length <= 1) return;

    const last = items[items.length - 1];
    this.slide.nativeElement.prepend(last);

    // El nuevo slide activo sigue siendo el segundo (índice 1)
    const newActive = this.slide.nativeElement.querySelectorAll<HTMLElement>('.item')[1];
    this.setActiveSlide(newActive);
  }

  
}