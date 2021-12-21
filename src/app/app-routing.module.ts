import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewpaymentComponent } from './newpayment/newpayment.component';
import { PaymensComponent } from './paymens/paymens.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: "", component:LoginComponent},
  {path: "newuser", component:RegisterComponent},
  {path: "newpayment", component:NewpaymentComponent},
  {path: "payment", component:PaymensComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
