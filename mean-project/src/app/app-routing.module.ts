// manage Angular routes
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';

const routes: Routes = [
  {
    path: '', // main page, root page  //which part after our domain we want to load a certain page
    component: PostListComponent, // what should get loaded
  },

  {
    path: 'create', // do not add '/create', just 'create'
    component: PostCreateComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)], // inform the angular router module about our new created routes
  exports: [RouterModule],
})
export class AppRoutingModule {}

// Angular Modules are building blocks

// routes are simply JavaScript objects here where we define for which URL,
// which part of our app should be presented

// so we create a new constant
