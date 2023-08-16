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
      this.pageDescription = `This webpage serves as a comprehensive hub, <span>aggregating and showcasing</span> profiles of all registered users within our network.`;
    } else if (
      currentRoute.startsWith('/users/') &&
      currentRoute.endsWith('/posts')
    ) {
      this.pageTitle = "User's Posts";
      this.pageDescription =
        'This dedicated web page provides you with the platform to <span>seamlessly explore and delve into the collective posts of every user</span>, offering a comprehensive glimpse into the diverse array of content shared by each individual across our network.';
    } else if (currentRoute.startsWith('/users/')) {
      this.pageTitle = 'User Details Page';
      this.pageDescription = `Within this webpage, you're presented with the opportunity to <span>gain intricate insights into each user</span>, as it serves as a hub teeming with comprehensive details encompassing every facet of their presence and engagement within our network`;
    } else {
      this.pageTitle = 'Default Title';
      this.pageDescription = 'Default Description';
    }
  }
}
