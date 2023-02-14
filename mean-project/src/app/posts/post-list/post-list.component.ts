import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // @Input()
  posts: Post[] = [];
  private postsSub: Subscription;

  // we need to make the posts property bindable from outside via property binding
  // from the outside means from the parent component

  /*postsService: PostsService;
  constructor(postsService: PostsService) {
    this.postsService = postsService;
  }*/

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostsUpdatedListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe(); // prevent memory leak
  }

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
