import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './core/containers/home-page.component';
import { NotFoundPageComponent } from './core/containers/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    data: { title: 'Home' },
  },
  {
    path: 'weights',
    loadChildren: () =>
      import('./weights/weights.module').then((m) => m.WeightsModule),
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    data: { title: 'Not found' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
