import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../core/services/news.service';
import { map, Observable } from 'rxjs';
import { News } from '../../core/models/news.model';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './news-detail.page.html',
  styleUrl: './news-detail.page.scss',
})
export class NewsDetailPage {

  private route = inject(ActivatedRoute);
  private newsService = inject(NewsService);

  news$!: Observable<News | null>;
  related$!: Observable<News[]>;

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.news$ = this.newsService.getBySlug(slug);
    this.related$ = this.newsService.getAll().pipe(
      map(news =>
        news
          .filter(n => n.slug !== slug)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
      )
    );
  }


}
