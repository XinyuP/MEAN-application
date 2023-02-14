import { keyframes } from '@angular/animations';
import { Component } from '@angular/core';

// decorator
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  enteredValue = '';
  newPost = 'No';

  onAddPost() {
    this.newPost = this.enteredValue;
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
