import { Injectable } from '@angular/core';
import { Post } from '../post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];

  getPosts() {
    return [...this.posts]; // make copy of posts array
    // use [] to create new array
    // ... take all the element of posts array
    // pul them out of that array and add them to the new array
  }

  addPost(title: string, content: string) {
    const post: Post = {
      title: title,
      content: content,
    };
    this.posts.push(post);
  }
}

/**
 * I actually don't want to return the original array
 * because arrays and objects in JavaScript and also in TypeScript are reference types.
 */
