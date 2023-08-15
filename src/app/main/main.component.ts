import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router) {} // Inject Router

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((data) => {
        this.users = data.map((user) => {
          return user;
        });
      });
  }

  onRowButtonClick(user: any) {
    this.router.navigate(['/users', user.id]);
  }
}
