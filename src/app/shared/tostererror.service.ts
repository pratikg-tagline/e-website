import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TostererrorService {

  constructor(private toastr: ToastrService) { 


  
  }
  showSuccess(message:string) {
    this.toastr.success('',message);
  }
  error(message:string) {
    this.toastr.error('',message);
  }
}
