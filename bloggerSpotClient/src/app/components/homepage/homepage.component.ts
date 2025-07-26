import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';

interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  views: number;
  comments: number;
  image?: string;
  description: string;
}

interface SidebarItem {
  title: string;
  subtitle?: string;
  date?: string;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  articles: Article[] = [
    {
      id: '1',
      title: 'How I Made My Java Service 70x Faster by Rethinking JSON Deserialization',
      author: 'The Latency Gambler',
      date: 'Jul 16',
      views: 367,
      comments: 15,
      image: 'https://via.placeholder.com/120x80',
      description: 'The Problem You Don\'t Notice—Until You Scale'
    },
    {
      id: '2',
      title: 'Clean Architecture with Modern Java',
      author: 'Pedro Emanoel',
      date: 'Jul 17',
      views: 120,
      comments: 7,
      image: 'https://via.placeholder.com/120x80',
      description: 'Clean Architecture for Java Developers'
    },
    {
      id: '3',
      title: '50 Java 8 Lambda Snippets Every Developer Should Know',
      author: 'Gaddam.Naveen',
      date: 'Jun 4',
      views: 111,
      comments: 5,
      image: 'https://via.placeholder.com/120x80',
      description: '🎉 Article Published: 209'
    },
    // More dummy articles for scrolling
    {
      id: '4',
      title: 'Understanding Dependency Injection in Angular',
      author: 'Jane Doe',
      date: 'Jul 18',
      views: 210,
      comments: 12,
      image: 'https://via.placeholder.com/120x80',
      description: 'A deep dive into DI patterns in Angular.'
    },
    {
      id: '5',
      title: 'RxJS: The Basics and Beyond',
      author: 'John Smith',
      date: 'Jul 19',
      views: 340,
      comments: 22,
      image: 'https://via.placeholder.com/120x80',
      description: 'Reactive programming made simple.'
    },
    {
      id: '6',
      title: 'Angular Signals: What, Why, and How?',
      author: 'Alex Johnson',
      date: 'Jul 20',
      views: 180,
      comments: 9,
      image: 'https://via.placeholder.com/120x80',
      description: 'Exploring the new signals feature in Angular.'
    },
    {
      id: '7',
      title: 'TypeScript Tips for Large Projects',
      author: 'Emily White',
      date: 'Jul 21',
      views: 290,
      comments: 17,
      image: 'https://via.placeholder.com/120x80',
      description: 'How to keep your TypeScript codebase maintainable.'
    },
    {
      id: '8',
      title: 'Optimizing Angular Apps for Performance',
      author: 'Michael Green',
      date: 'Jul 22',
      views: 410,
      comments: 25,
      image: 'https://via.placeholder.com/120x80',
      description: 'Best practices for a faster Angular app.'
    },
    {
      id: '9',
      title: 'Unit Testing Angular Components',
      author: 'Sara Blue',
      date: 'Jul 23',
      views: 150,
      comments: 8,
      image: 'https://via.placeholder.com/120x80',
      description: 'A practical guide to testing in Angular.'
    },
    {
      id: '10',
      title: 'State Management in Angular: NgRx vs Signals',
      author: 'Chris Red',
      date: 'Jul 24',
      views: 320,
      comments: 19,
      image: 'https://via.placeholder.com/120x80',
      description: 'Comparing two popular state management approaches.'
    }
  ];

  staffPicks: SidebarItem[] = [
    { title: 'Ozzy Osbourne: Legacy of a Madman', subtitle: 'In The Riff by Eric Dockett', date: 'Oct 25, 2024' },
    { title: 'How to Heal from Caregiver Burnout', subtitle: 'In Wise & Well by Andrea Romeo RN, BN', date: 'Jun 26' },
    { title: 'Pine Cones Changed the Way I Grill Salmon Forever', subtitle: 'In Tastyle by John Gobins', date: 'Jul 11' },
    { title: 'The Art of Mindful Coding', subtitle: 'In Mindful Dev by Sam Zen', date: 'Jul 10' },
    { title: 'Why Coffee Makes You a Better Coder', subtitle: 'In Dev Life by Java Joe', date: 'Jul 9' },
    { title: '10 Habits of Highly Effective Developers', subtitle: 'In Productivity Hacks by Lisa Swift', date: 'Jul 8' },
    { title: 'Debugging: The Zen Way', subtitle: 'In Mindful Dev by Sam Zen', date: 'Jul 7' },
    { title: 'How to Write Clean Code', subtitle: 'In Code Quality by Alan Turing', date: 'Jul 6' },
    { title: 'The Future of JavaScript Frameworks', subtitle: 'In Web Trends by Ada Lovelace', date: 'Jul 5' },
    { title: 'Remote Work: Staying Productive', subtitle: 'In Work Life by Grace Hopper', date: 'Jul 4' },
    { title: 'Why You Should Learn TypeScript', subtitle: 'In TypeScript Weekly by Anders Hejlsberg', date: 'Jul 3' },
    { title: 'The Power of Open Source', subtitle: 'In Community by Linus Torvalds', date: 'Jul 2' }
  ];

  recommendedTopics: string[] = [
    'Data Science', 'Writing', 'Productivity', 'Politics', 'Cryptocurrency', 'Psychology', 'Machine Learning',
    // More dummy topics
    'Web Development', 'Angular', 'TypeScript', 'RxJS', 'Testing', 'Performance', 'Design Patterns'
  ];

  constructor(private router: Router) {}

  openArticle(article: Article) {
    this.router.navigate(['/article', article.id]);
  }
}
