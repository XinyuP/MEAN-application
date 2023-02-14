import { Component } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  posts = [
    {
      title: 'First Post',
      content: 'guhknyj',
    },
    {
      title: '2 Post',
      content: '3232',
    },
    {
      title: '3 Post',
      content: 'guhkdsdsdsnyj',
    },
  ];
}
