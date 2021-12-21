import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import Swal from 'sweetalert2';
import { PaymentsService } from '../payments.service';

@Component({
  selector: 'app-newpayment',
  templateUrl: './newpayment.component.html',
  styleUrls: ['./newpayment.component.scss']
})
export class NewpaymentComponent implements OnInit {
  
  PaymentForm = new FormGroup({
    tipo_pago: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    file: new FormControl('', []),
     })
  constructor(public _router:Router,private _payment:PaymentsService) { }
  fileName = '';
  public mostrar_formulario=false;
  public archivo:any;
  public busqueda:any;
  public nombre_encontrado:string;
  public mostrar_alerta=false;
  public id_encontrado:any;
  ngOnInit(): void {
  }
  addpay(){
    if(this.archivo =='' || this.archivo == undefined){
      Swal.fire('','Debe adjuntar un archivo','info');
      return;
    }
    else{
      var myFormData = new FormData();
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      myFormData.append('id_encontrado', this.id_encontrado);
      myFormData.append('tipo_pago', this.PaymentForm.controls['tipo_pago'].value);
      myFormData.append('fecha', this.PaymentForm.controls['fecha'].value);
      myFormData.append('descripcion',this.PaymentForm.controls['descripcion'].value);
      myFormData.append('archivo',this.archivo);
      this._payment.RegisterPayment(myFormData).subscribe(
        data => {
            if(data==1){
            Swal.fire('Guardado','','success');
            this.mostrar_formulario=false;
            this.busqueda='';
            this._router.navigate(['/payment']);
            return;
          }
        },
        error => {
         console.log(error);
         
        }
      );
    }
  }
  onFileSelectEnunciado(event:any) {
    const reader = new FileReader();
    this.archivo = event.target.files[0];
  }



buscar_usuario(){
  let json = {
    'identificacion': this.busqueda,         
   }
   this._payment.SearchUsers(json).subscribe(
    data => {    
     if(data.length>0){
      this.nombre_encontrado= data[0]['name'] + ' ' + data[0]['last_name'];
      this.id_encontrado=data[0]['id'];
      this.mostrar_formulario=true;
      this.mostrar_alerta=false;
     }else{
      this.mostrar_formulario=false;
      this.mostrar_alerta=true;
     }
     },
   error => {
    console.log(error);
    // this.presentToast('Hubo un problema al buscar');
   }
 );

}
  


}
