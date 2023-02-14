import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';


// decorator
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  @Output() postCreated = new EventEmitter<Post>(); // EventEmitter is a so-called generic type
  // this decorator turns this into an event to which we can listen to
  // from the outside(in the parent componnet)


  onAddPost() {
    // this.newPost = this.enteredContent;
    const post: Post = {
      title: this.enteredTitle,
      content: this.enteredContent,
    };
    this.postCreated.emit(post);
  }
}

/*
@angular/core
  this package includes these core features
  like component decorator, which you attach
  to a class to mark it as a component which
  angular then scans for certain features
  and uses as a component.

  Decorator that marks a class as an Angular component
  and provides configuration metadata that determines
  how the component should be processed, instantiated,
  and used at runtime.



*/
