import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {

  @Input() posts = [];
  // we need to make the posts property bindable from outside via property binding
  // from the outside means from the parent component



  // posts = [
  //   {
  //     title: 'First Post',
  //     content: 'guhknyj',
  //   },
  //   {
  //     title: '2 Post',
  //     content: '3232',
  //   },
  //   {
  //     title: '3 Post',
  //     content: 'guhkdsdsdsnyj',
  //   },
  // ];
}
