import { Component, Input } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  @Input() posts: Post[] = [];

  // we need to make the posts property bindable from outside via property binding
  // from the outside means from the parent component

  /*postsService: PostsService;
  constructor(postsService: PostsService) {
    this.postsService = postsService;
  }*/

  constructor(public postsService: PostsService) {}

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
