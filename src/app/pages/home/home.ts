import { Component, inject, OnDestroy, signal, OnInit, Renderer2, DOCUMENT, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { News } from '../../core/models/news.model';
import { NewsService } from '../../core/services/news.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


declare const $: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnDestroy, OnInit {
  activeSlide = 0;
  related$!: Observable<News[]>;
  private newsService = inject(NewsService);
  private route = inject(ActivatedRoute);
  news$!: Observable<News | null>;

  slides = signal<HTMLElement[]>([]);
  current = signal(0);


  instagramEmbed!: SafeHtml;
  linkedinEmbed!: SafeHtml;

private scriptLoaded = false;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

ngAfterViewInit() {

  this.startAutoPlay();

  if (this.scriptLoaded) return;

  const instagramScript = this.renderer.createElement('script');
  instagramScript.src =
    'https://widgets.sociablekit.com/instagram-hashtag-feed/widget.js';
  instagramScript.defer = true;

  const linkedinScript = this.renderer.createElement('script');
  linkedinScript.src =
    'https://widgets.sociablekit.com/linkedin-profile-posts/widget.js';
  linkedinScript.defer = true;

  this.renderer.appendChild(this.document.body, instagramScript);
  this.renderer.appendChild(this.document.body, linkedinScript);

  this.scriptLoaded = true;


  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
    console.log('Resize forzado para SociableKIT');
  }, 500);
}


  ngOnDestroy() {
    clearInterval(this.intervalId);
  }


  goTo(index: number) {
    this.current.set(index);
  }


    ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.news$ = this.newsService.getBySlug(slug);
    this.initScrollAnimations();
        this.related$ = this.newsService.getAll().pipe(
          map(news =>
            news
              .filter(n => n.slug !== slug)
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)
          )
        );
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
      icon: 'cards/ICONOS-01.jpg',
      title: 'Greater Resistant to Fire',
      text: 'ASTM E84 & NFPA 285 Compliant.',
    },
    {
      icon: 'cards/ICONOS-02.jpg',
      title: 'Long Lasting Colors',
      text: '45 Beautiful colors for you.',
    },
    {
      icon: 'cards/ICONOS-03.jpg',
      title: 'Dust Resistant',
      text: 'Transparent coating against dust.',
    },
    {
      icon: 'cards/ICONOS-04.jpg',
      title: 'Strong & Flexible',
      text: 'Excelent torsion and flexion.',
    },
    {
      icon: 'cards/ICONOS-05.jpg',
      title: 'Wheater Resistant',
      text: 'High resistance agains the elements.',
    },
  ];
  slideImages = [
  'assets/slider/slide1.webp',
  'assets/slider/slide2.webp',
  'assets/slider/slide3.webp',
  'assets/slider/slide4.webp',
];

intervalId!: number;

startAutoPlay() {
  this.stopAutoPlay();
  this.intervalId = window.setInterval(() => {
    this.next();
  }, 10000);
}

stopAutoPlay() {
  if (this.intervalId) {
    clearInterval(this.intervalId);
  }
}

next() {
  this.current.set(
    (this.current() + 1) % this.slideImages.length
  );
}

prev() {
  this.current.set(
    (this.current() - 1 + this.slideImages.length) % this.slideImages.length
  );
}
}
