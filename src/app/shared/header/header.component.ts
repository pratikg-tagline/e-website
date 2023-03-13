import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
interface Header {
  label: string;
  routerLink: string;
}
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  

  headers:Header[]= [
    {
      label: 'Product',
      routerLink: '',
    },
    {
      label: 'View Order',
      routerLink: '',
    }
  ];
  logOut(){
  localStorage.clear();
 }

  
}
