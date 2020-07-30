import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/containers/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
