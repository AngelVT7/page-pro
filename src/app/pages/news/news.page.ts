import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsService } from '../../core/services/news.service';
import { Observable } from 'rxjs';
import { News } from '../../core/models/news.model';

@Component({
  standalone: true,
  selector: 'app-news',
  imports: [CommonModule, RouterModule],
  templateUrl: './news.page.html',
  styleUrl: './news.page.scss'
})
export class NewsPage {



  private newsService = inject(NewsService);

  news$: Observable<News[]> = this.newsService.getAll();

  visibleCount = 15;
  step = 15;

  loadMore() {
    this.visibleCount += this.step;
  }

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
}
