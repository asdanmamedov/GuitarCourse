import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '../shared.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  form1: FormGroup;
  constructor(private service: SharedService) { }

  @Input() user: any;
  UserId: string;
  UserFirstName: string;
  UserLastName: string;
  UserLogin: string;
  UserPassword: string;
  isLogin: boolean;

  UsersList: any = [];
  ngOnInit(): void {
    this.loadUserList();
    this.form = new FormGroup({
      userFirstName: new FormControl('', Validators.required),
      userLastName: new FormControl('', Validators.required),
      userEmail: new FormControl('', Validators.required),
      userPassword: new FormControl(null , Validators.required)
    });
    this.form1 = new FormGroup({
      userLoginEmail: new FormControl('', Validators.required),
      userLoginPassword: new FormControl(null , Validators.required)
    });
  }

  // tslint:disable-next-line:typedef
  loadUserList(){
    this.service.getUsersList().subscribe((data: any ) => {
      this.UsersList = data;

      this.UserId = this.user.UserId;
      this.UserFirstName = this.user.UserFirstName;
      this.UserLastName = this.user.UserLastName;
      this.UserLogin = this.user.UserLogin;
      this.UserPassword = this.user.UserPassword;
    });
  }

  // tslint:disable-next-line:typedef
  addUser(){
    // tslint:disable-next-line:prefer-const
    let val = {UserId: this.UserId,
      UserFirstName: this.form.value.userFirstName,
      UserLastName: this.form.value.userLastName,
      UserLogin: this.form.value.userEmail,
      UserPassword: this.form.value.userPassword};

    this.service.addUser(val).subscribe(res => {
      alert(res.toString());
    });
    this.form.reset();

  }

  // tslint:disable-next-line:typedef
  updateUser(){
    let val = {UserId: this.UserId,
      UserFirstName: this.UserFirstName,
      UserLastName: this.UserLastName,
      UserLogin: this.UserLogin,
      UserPassword: this.UserPassword};

    this.service.updateUser(val).subscribe(res => {
      alert(res.toString());
    });
  }

  login(): void {
    // tslint:disable-next-line:forin
    for (const k in this.UsersList) {
      // tslint:disable-next-line:max-line-length
      if (this.UsersList[k].UserLogin === this.form1.value.userLoginEmail && this.UsersList[k].UserPassword === this.form1.value.userLoginPassword) {
        alert('добро пожаловать на сайт' + this.UsersList[k].UserFirstName);
        this.isLogin = true;
        break;
      } else if (this.UsersList[k].UserLogin === this.form1.value.userLoginEmail && this.UsersList[k].UserPassword !== this.form1.value.userLoginPassword) {
        this.isLogin = false;
      } else {
        this.isLogin = false;
      }
    }

    if (!this.isLogin) {
      this.form1.reset();
      alert('Попробуйте еще раз!!!');
    }
    else
    {
      this.form1.reset();
    }
  }
}