import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  pageTitle: string = 'Default Title';
  pageDescription: string = 'Default Description';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updatePageInfo();
      });
  }

  updatePageInfo() {
    const currentRoute = this.router.url;
    if (currentRoute === '/users') {
      this.pageTitle = 'Main Page';
      this.pageDescription = 'Lorem ipsum dolor sit amet.';
    } else if (
      currentRoute.startsWith('/users/') &&
      currentRoute.endsWith('/posts')
    ) {
      // Route like /users/:id/posts
      this.pageTitle = "User's Posts";
      this.pageDescription = 'Posts of the selected user.';
    } else if (currentRoute.startsWith('/users/')) {
      // Other user-related routes
      this.pageTitle = 'User Details Page';
      this.pageDescription = 'Details about the selected user.';
    } else {
      this.pageTitle = 'Default Title';
      this.pageDescription = 'Default Description';
    }
  }
}
