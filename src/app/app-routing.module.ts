import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./feature/auth/auth.module').then((auth) => auth.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./feature/admin/admin/admin.module').then(
        (admin) => admin.AdminModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
