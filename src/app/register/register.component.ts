import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegisterForm = new FormGroup({
    nidentification: new FormControl('', [Validators.required]),
    names: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email,Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  constructor(private _ingreso_service:LoginService) { }

  ngOnInit(): void {
  }

  

  addUser(){
        let json = {
      'nidentification': this.RegisterForm.controls['nidentification'].value,
      'names': this.RegisterForm.controls['names'].value,
      'last_name': this.RegisterForm.controls['last_name'].value,
      'telefono': this.RegisterForm.controls['telefono'].value,
      'email': this.RegisterForm.controls['email'].value,      
      'password': this.RegisterForm.controls['password'].value,      
     }
          this._ingreso_service.register(json).subscribe(
      data => {
           
              Swal.fire('',data.message,'info');
              this.RegisterForm.reset();       
            },
     error => {
       console.log(error);
      // this.presentToast('Hubo un problema al buscar');
     }
   );
  }

}
