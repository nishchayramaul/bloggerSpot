import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  views: number;
  comments: number;
  image?: string;
  description: string;
  content?: string;
}

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.css'
})
export class ArticlePageComponent {
  route = inject(ActivatedRoute);
  articleId = this.route.snapshot.paramMap.get('id');
  article: Article | null = null;

  // Sample article data - in real app, this would come from a service
  private articles: Article[] = [
    {
      id: '1',
      title: 'How I Made My Java Service 70x Faster by Rethinking JSON Deserialization',
      author: 'The Latency Gambler',
      date: 'Jul 16, 2025',
      views: 367,
      comments: 15,
      image: 'https://via.placeholder.com/120x80',
      description: 'The Problem You Don\'t Notice—Until You Scale',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      id: '2',
      title: 'Clean Architecture with Modern Java',
      author: 'Pedro Emanoel',
      date: 'Jul 17, 2025',
      views: 120,
      comments: 7,
      image: 'https://via.placeholder.com/120x80',
      description: 'Clean Architecture for Java Developers',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: '3',
      title: '50 Java 8 Lambda Snippets Every Developer Should Know',
      author: 'Gaddam.Naveen',
      date: 'Jun 4, 2025',
      views: 111,
      comments: 5,
      image: 'https://via.placeholder.com/120x80',
      description: '🎉 Article Published: 209',
      content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
    }
  ];

  ngOnInit() {
    this.loadArticle();
  }

  loadArticle() {
    if (this.articleId) {
      this.article = this.articles.find(article => article.id === this.articleId) || null;
    }
  }
} 