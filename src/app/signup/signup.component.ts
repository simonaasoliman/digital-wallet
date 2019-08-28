import { NgModule, Component, Pipe, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

//models
import { User } from '../models/user';


//service
import { AuthService } from '../service/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  authentication_types: string[] = ["finger print", "eye-detection", "password"];
  signup_user: User;
  myform : FormGroup;

  name: FormControl;
  email: FormControl;
  password: FormControl;
  authentication_type: FormControl;
  address: FormControl;
  phone: FormControl;
  
  submitted : Boolean  = false;

 



  constructor( 
              private authService: AuthService, 
              private router: Router) {
    }

  createFormControls() {
    this.name = new FormControl("", Validators.required);
    this.email = new FormControl("", [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.password = new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.address = new FormControl("", Validators.required);
    this.phone = new FormControl();
    this.authentication_type = new FormControl("", Validators.required);
  }

  createForm() {
    this.myform = new FormGroup({
      name: this.name,        
      email: this.email,
      phone: this.phone,
      password: this.password,
      authentication_type: this.authentication_type,
      address: this.address
    });
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  onSubmit() {
    this.submitted = true;
    alert(this.myform.valid)
    if (this.myform.valid) {

      this.signup_user = {
        id: '',
        name: this.myform.value.name,        
        email: this.myform.value.email,
        phone: this.myform.value.phone,
        password: this.myform.value.password,
        authentication_type: this.myform.value.authentication_type,
        address: this.myform.value.address,
        authentication_value:''
      }
      this.authService.signup(this.signup_user)
        .subscribe(
            (data) => {
            if(!data.name){
              alert('invalid information entered! ')
            }else{
              alert(' welcome!')
              console.log("User is sucssfully registered!");
              this.router.navigateByUrl('/');
            }
                
            }
        );
      console.log("Form Submitted!");
      console.log(this.myform.value);
      this.myform.reset();
    }
  }
}

	