import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
// import { Post } from '../post.model';
import { PostsService } from '../posts.service';

// decorator
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  post: Post;
  isLoading = false;

  private mode = 'create';
  private postId: string;

  // @Output()
  // postCreated = new EventEmitter<Post>(); // EventEmitter is a so-called generic type
  // this decorator turns this into an event to which we can listen to
  // from the outside(in the parent componnet)

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute // hold info about the route we are currently on
  ) {}

  /** PostCreateComponent will be loaded for two different paths
   * we need to handle these different cases
   * -> we inject something into the component which is loaded through the router -- help us identify route info
   *
   * -> when we can extract postId: we are in eidt mode | otherwise: create mode
   *
   */

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // this subscribe returns a paramMapObject
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true; //
        console.log(this.postId);
        this.postsService.getPost(this.postId).subscribe((postData) => {
          this.isLoading = false; //
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
    // for all built-in observables, we never need to unsubscribe
  }

  onSavePost(form: NgForm) {
    // this.newPost = this.enteredContent;
    if (form.invalid) {
      return;
    }
    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content,
    // };

    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
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
