import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css'],
})
export class UserPostsComponent implements OnInit {
  userId: number = 0;
  posts: any[] = []; // Array to store fetched posts
  postsFetched: boolean = false; // Flag to indicate if posts are fetched

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = +params['id'];
      this.fetchUserPosts();
    });
  }

  fetchUserPosts() {
    this.http
      .get<any[]>(
        `https://jsonplaceholder.typicode.com/users/${this.userId}/posts`
      )
      .subscribe(
        (data) => {
          this.posts = data;
          this.postsFetched = true; // Set the flag to true when posts are fetched
        },
        (error) => {
          console.error('Error fetching user posts:', error);
          this.postsFetched = false; // Set the flag to false if there's an error
        }
      );
  }
}
