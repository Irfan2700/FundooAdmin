import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {

  constructor() {}




  ngOnInit() {

    var adminToken;

    if(localStorage.getItem('adminToken')){
      window.location.href= "/adminhome";
    }
    $(document).ready(function () {
      $('#logbutton').click(function () {
        let email = ''+ $('#emailInput').val();
        let password = ''+ $('#passwordInput').val();

        $(".error").remove();

        if(email){
          var flag = true;
        var regEx = /\S+@\S+\.\S+/;
      var validEmail = regEx.test(email);
      if (!validEmail) {
        $('#emailInput').after('<span class="error">Enter a valid email</span>');
        flag = false;
      }
      if(flag === false){
        return false;
      }
          if(password){
          $.ajax({
            type: "POST",
            url: "http://34.213.106.173/api/user/adminLogin",
            // contentType: "application/json; charset=utf-8",
            dataType: "json",
            // data: "email= " + email + "&password=" + password,
            data: {
              "email": email,
              "password": password
            },

            error: function(response){
              console.log("Error in Login");
              alert("Unsuccessful login!! ... Please try again.")


            },

            success: function(response){
              console.log("Successfully Login!!");
              console.log(response);
              alert("Login Successfully!!");
              // function closeExpand(){
              //   this.AuthGuard.sendToken(response.id)
              // }
              // closeExpand();
              // adminToken = response.id;
              localStorage.setItem('adminToken',response.id);
              window.location.replace("http://localhost:4200/adminhome")
            }
          })
        }else{
          $('#passwordInput').after('<span class="error">Password is required</span>');
          return false;
        }
        }else{
          $('#emailInput').after('<span class="error">Email is required</span>');
          return false;
        }

        return false;
      })
    })

    console.log(adminToken);

  }

}
