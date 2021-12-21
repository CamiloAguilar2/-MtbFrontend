import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentsService } from '../payments.service';

@Component({
  selector: 'app-paymens',
  templateUrl: './paymens.component.html',
  styleUrls: ['./paymens.component.scss']
})
export class PaymensComponent implements OnInit {
  public rol: string | undefined;
  public token: string | undefined;
  public name: string | undefined;
  public id: string | undefined;
  public id_user: string | undefined;
  public information:any;
      
  constructor(private _router:Router,private _payment:PaymentsService) { }
  ngOnInit() {
    this.muestrame_token();
  }

  logout(){
    localStorage.removeItem('token');
    this._router.navigate(['/']);
  }

  deleteRegister(id: any){
    let json = {
      'id_registro': id,
           }
          
           this._payment.DeleteRegister(json).subscribe(
            data => {      
              this.Getpayments();
                   },
            error => {
              console.log(error);
            }
          );    
  }

  Getpayments(){
    let json = {
      'rol': this.rol,
      'identificacion': this.id_user,         
     }  
    this._payment.Allpayments(json).subscribe(
      data => {      
        this.information = data;
             },
      error => {
        console.log(error);
      }
    );
  }
  
  muestrame_token() {
    let result = localStorage.getItem('token');
   result = JSON.parse(result);   
   if(result){
    this.token = result['access_token'].token;
    this.rol = result['rol'][0].rol;
    this.name = result['user'].name + ' ' + result['user'].last_name;
    this.id = result['user'].identification;
    this.id_user = result['user'].id;
    this.Getpayments();
    //this._router.navigate(['/payment']);
   }else{
    this._router.navigate(['/']);
   }
    }
}
