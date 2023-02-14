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
  router: any;

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

  getPost(id: string) {
    // return {
    //   ...this.posts.find((p) => p.id === id),
    // };
    return this.http.get<{ _id: string; title: string; content: string }>(
      'http://localhost:3000/api/posts/' + id
    );
  }

  addPost(title: string, content: string) {
    const post: Post = {
      id: null,
      title: title,
      content: content,
    };
    this.http
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe((responseData) => {
        // console.log(responseData.message);
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {
      id: id,
      title: title,
      content: content,
    };
    this.http
      .put('http://localhost:3000/api/posts/' + id, post)
      .subscribe((response) => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex((p) => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        // this.router.navigate(['/'])
      });
  }

  deletePost(postId: string) {
    this.http
      .delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        console.log('Deleted!');
        const updatedPosts = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}

/**
 * I actually don't want to return the original array
 * because arrays and objects in JavaScript and also in TypeScript are reference types.
 */
