import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: Post[] }>(
        'http://localhost:3000/api/posts'
      )
      .subscribe((postData) => {
        this.posts = postData.posts;
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
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}

/**
 * I actually don't want to return the original array
 * because arrays and objects in JavaScript and also in TypeScript are reference types.
 */
