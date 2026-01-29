import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./pages/home/home').then(m => m.Home),
            },
            {
                path: 'about',
                loadComponent: () =>
                    import('./pages/about/about').then(m => m.About),
            },
            {
                path: 'products',
                loadComponent: () =>
                    import('./pages/products/products').then(m => m.Products),
            },
            {
                path: 'technical-especifications',
                loadComponent: () =>
                    import('./pages/technical-especifications/technical-especifications').then(m => m.TechnicalEspecifications),
            },
            {
                path: 'colors',
                loadComponent: () =>
                    import('./pages/colors/colors').then(m => m.Colors),
            },
            {
                path: 'colors/:slug',
                loadComponent: () =>
                    import('./pages/colors/color-details/color-details').then(m => m.ColorDetails),
            },
            {
                path: 'projects',
                loadComponent: () =>
                    import('./pages/projects/projects').then(m => m.Projects),
            },
            {
                path: 'downloads',
                loadComponent: () =>
                    import('./pages/downloads/downloads').then(m => m.Downloads),
            },
            {
                path: 'distributors-sales-rep',
                loadComponent: () =>
                    import('./pages/distributors-sales-rep/distributors-sales-rep').then(m => m.DistributorsSalesRep),
            },
            {
                path: 'vrtour',
                loadComponent: () =>
                    import('./pages/vrtour/vrtour').then(m => m.Vrtour),
            },
            {
                path: 'news',
                loadComponent: () =>
                    import('./pages/news/news.page').then(m => m.NewsPage),
            },
            {
                path: 'news/:slug',
                loadComponent: () =>
                    import('./pages/news/news-detail.page').then(m => m.NewsDetailPage),
            },
            {
                path: 'contact',
                loadComponent: () =>
                    import('./pages/contact/contact').then(m => m.Contact),
            },
            {
                path: 'request-a-sample',
                loadComponent: () =>
                    import('./pages/request-a-sample/request-a-sample').then(m => m.RequestASample),
            },
            {
                path: 'terms-and-conditions',
                loadComponent: () =>
                    import('./pages/terms-and-conditions/terms-and-conditions').then(m => m.TermsAndConditions),
            },
            {
                path: 'see-our-faq',
                loadComponent: () =>
                    import('./pages/see-our-faq/see-our-faq').then(m => m.SeeOurFAQ),
            },
        ],
    },
    {
        path: '**',
        redirectTo: '',
    },
];
