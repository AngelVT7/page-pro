import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { News } from '../models/news.model';
import { NEWS_DATA } from '../data/news.data';

@Injectable({ providedIn: 'root' })
export class NewsService {

  getAll(): Observable<News[]> {
    return of(NEWS_DATA);
  }

  getBySlug(slug: string): Observable<News | null> {
    const news = NEWS_DATA.find(n => n.slug === slug);
    return of(news ?? null);
  }


  getFeatured(): Observable<News[]> {
    return of(
      NEWS_DATA.filter(n => n.featured)
    );
  }

  getRelated(category: string, excludeSlug: string): Observable<News[]> {
    return of(
      NEWS_DATA
        .filter(n => n.category === category && n.slug !== excludeSlug)
        .slice(0, 3)
    );
  }
}
