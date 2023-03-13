import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { AdmindeskComponent } from './admindesk/admindesk.component';

const routes: Routes = [
  {
    path:'',
    component:HeaderComponent,
    children:[
       {path: '', redirectTo: 'admindesk', pathMatch: 'full'} ,
         {path: 'admindesk', component: AdmindeskComponent  },
         
  ]
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
