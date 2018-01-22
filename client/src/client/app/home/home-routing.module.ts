import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../shared/guards/auth.guard';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {path: '**', redirectTo: ''}
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
