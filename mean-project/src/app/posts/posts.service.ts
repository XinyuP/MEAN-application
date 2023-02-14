import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { response } from 'express';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          // postData: every data that make it through this observable stream
          return postData.posts.map((post) => {
            // automatically be wrapped into an observable by rxjs
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        // no need to use copy --> it comes from the server, we won't accidently change it on the server,
        // there is no such connection, it was part of http response

        this.postsUpdated.next([...this.posts]);
        // inform about this update
      });

    // I wanna reach out to backend, fetch the posts, store them in posts variable here
    // and then fire my update listener to inform everyone interested in my app

    // we want to send http request here --> Angular has built-in http client

    // you can inject things into services too, not just in components

    // return [...this.posts]; // make copy of posts array
    // use [] to create new array
    // ... take all the element of posts array
    // pul them out of that array and add them to the new array
  }

  getPostsUpdatedListener() {
    return this.postsUpdated.asObservable();
  } // it returns an object which we can listen but we cannot emit

  addPost(title: string, content: string) {
    const post: Post = {
      id: null,
      title: title,
      content: content,
    };
    this.http
      .post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        console.log('Deleted!');
      });
  }
}

/**
 * I actually don't want to return the original array
 * because arrays and objects in JavaScript and also in TypeScript are reference types.
 */
