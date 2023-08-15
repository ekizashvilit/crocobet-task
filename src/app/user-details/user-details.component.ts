import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userId: number = 0;
  user: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = +params['id'];
      this.fetchUserDetails();
    });
  }

  fetchUserDetails() {
    this.http
      .get<any>('https://jsonplaceholder.typicode.com/users/' + this.userId)
      .subscribe((data) => {
        this.user = data;
      });
  }
}
