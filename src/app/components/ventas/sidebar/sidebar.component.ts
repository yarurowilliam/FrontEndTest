import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  logOut(): void{
    this.router.navigate(['/inicio']);
    this.toastr.warning('Gracias por utilizar nuestros servicios', 'Sesion finalizada');

  }
  rolU : string;

  validacionRol(rolLlegando : string):boolean{
    if (rolLlegando == this.rolU){
      return true;
    }else{
      return false;
    }

  }
}
