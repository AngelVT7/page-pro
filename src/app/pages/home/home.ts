import { Component, OnDestroy  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import Swiper from 'swiper';

declare const $: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnDestroy {
  activeSlide = 0;
  intervalId: any;

  

  ngAfterViewInit(): void {
    // Espera a que Angular pinte el HTML
    queueMicrotask(() => this.initHeroSlider());
  }

  ngOnDestroy(): void {
    // Evita dobles inicializaciones al navegar
    try {
      if ($('.tp-slider-active-4')?.hasClass('slick-initialized')) {
        $('.tp-slider-active-4').slick('unslick');
      }
      if ($('.tp-slider-nav-active')?.hasClass('slick-initialized')) {
        $('.tp-slider-nav-active').slick('unslick');
      }
    } catch {}
  }

  private initHeroSlider(): void {
    const $main = $('.tp-slider-active-4');
    const $nav  = $('.tp-slider-nav-active');
    const $arrows = $('.tp-slider-arrow-4');

    if (!$main.length) return;

    // Si ya estaba inicializado, lo reseteamos
    if ($main.hasClass('slick-initialized')) $main.slick('unslick');
    if ($nav.hasClass('slick-initialized')) $nav.slick('unslick');

    $main.slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,

  // ESTO ES CLAVE
  fade: true,
  cssEase: 'linear',

  autoplay: true,
  autoplaySpeed: 5000,

  asNavFor: '.tp-slider-nav-active',
  appendArrows: $arrows,

  prevArrow: `
    <button type="button" class="tp-slider-3-button-prev" aria-label="Anterior">
      <span class="tp-arrow-icon">‹</span>
    </button>`,

  nextArrow: `
    <button type="button" class="tp-slider-3-button-next" aria-label="Siguiente">
      <span class="tp-arrow-icon">›</span>
    </button>`
});


    if ($nav.length) {
      $nav.slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        arrows: false,
        dots: false,
        focusOnSelect: true,
        asNavFor: '.tp-slider-active-4',
      });
    }
  }

  slides = [
    {
      title: 'Innovative Industrial Solutions',
      subtitle: 'Engineering excellence for demanding industries',
      image: 'slider/slide1.jpg',
    },
    {
      title: 'Precision & Quality',
      subtitle: 'Designed to meet the highest standards',
      image: 'sliders/slider1.jpg',
    },
    {
      title: 'Global Projects',
      subtitle: 'Trusted by partners worldwide',
      image: 'slider/slide1.jpg',
    },
  ];

    ngOnInit() {
    this.startAutoSlide();
    this.initScrollAnimations();
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 6000);
  }

  next() {
    this.activeSlide =
      (this.activeSlide + 1) % this.slides.length;
  }

  prev() {
    this.activeSlide =
      (this.activeSlide - 1 + this.slides.length) %
      this.slides.length;
  }

  goTo(index: number) {
    this.activeSlide = index;
  }

  // ===== ON SCROLL ANIMATION =====
  initScrollAnimations() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.15 }
    );

    document
      .querySelectorAll('.animate-on-scroll')
      .forEach(el => observer.observe(el));
  }

  cards = [
    {
      icon: 'cards/Card1.png',
      title: 'Greater Resistant to Fire',
      text: 'ASTM E84 & NFPA 285 Compliant.',
    },
    {
      icon: 'cards/Card2.png',
      title: 'Long Lasting Colors',
      text: '45 Beautiful colors for you.',
    },
    {
      icon: 'cards/Card3.png',
      title: 'Dust Resistant',
      text: 'Transparent coating against dust.',
    },
    {
      icon: 'cards/Card4.png',
      title: 'Strong & Flexible',
      text: 'Excelent torsion and flexion.',
    },
    {
      icon: 'cards/Card5.png',
      title: 'Wheater Resistant',
      text: 'High resistance agains the elements.',
    },
  ];

}
