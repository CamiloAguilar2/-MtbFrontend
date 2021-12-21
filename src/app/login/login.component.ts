import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public rol: string | undefined;
  public nombre_pila:any;
  public email:any;
  public pass:any;
  LoginForm = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required])
  })
  constructor(private _ingreso_service:LoginService,private _router:Router) { }

  ngOnInit() {
    this.muestrame_token();
  }

  ingresar(){
   
   
    let json = {
      'email':this.LoginForm.controls['usuario'].value,
      'password':this.LoginForm.controls['clave'].value,         
     }
   
     this._ingreso_service.login(json).subscribe(
      data => {
       
       if(data.message){
        
         Swal.fire('Oops...', 'Algo salió mal, verifica tu correo y clave!', 'error')         
         return;
       }
       else{
        
         let nombre_usuario = data.user.name +' '+  data.user.last_name;
         localStorage.setItem('token', JSON.stringify(data));
        //  localStorage.setItem('token', JSON.stringify(data.access_token['token']));
        //  localStorage.setItem('role', JSON.stringify(data.rol[0]['rol']));
        //  localStorage.setItem('name', JSON.stringify(nombre_usuario));
         this._router.navigate(['/payment']);
       }
            },
     error => {
      
      // this.presentToast('Hubo un problema al buscar');
     }
   );
     
  }

  muestrame_token() {
      let result = localStorage.getItem('token');
     result = JSON.parse(result);
     if(result){
      this.rol = result['rol'];
     
      this._router.navigate(['/payment']);
     }
     
    }
  
}
