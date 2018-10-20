import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import "datatables.net";
// import "datatables.net-scroller";

@Component({
  selector: 'app-home',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  constructor() { }

array = [];

  ngOnInit() {

    var dummy;

    $('document').ready(function(){



      $.ajax({
        type: "GET",
        url: "http://34.213.106.173/api/user/UserStatics",
        // data:{ access_token: localStorage.getItem('token')},
        headers: {
          "Authorization": localStorage.getItem('adminToken')
        },

        success: function(response){
          console.log("successfully")
          console.log(response);
          console.log(response["data"].details[0].count);
          $('#basic').after('<h3 class="card-text" id="basicNumber">'+ response["data"].details[0].count +'</h3>')
          $('#advance').after('<h3 class="card-text" id="advanceNumber">'+ response["data"].details[1].count +'</h3>')
        },
        error: function(){
          alert("Error in Fetching the Page!!..")
        }
      })



      $.ajax({
        type: "GET",
        url: "http://34.213.106.173/api/user/getAdminUserList",
        headers: {
          "Authorization": localStorage.getItem('adminToken')
        },

        success: function(response){

          var arrdata = [];
          for(var i=0; i<response.data.data.length; i++){

            arrdata.push([i+1,response.data.data[i].firstName,response.data.data[i].lastName,response.data.data[i].email,response.data.data[i].service]);
          }

           var table = $('#dataTable').DataTable({
            data: arrdata,
            columnDefs: [ {
              targets: 5,


              render: function ( ) {
                return '<button class="btn btn-primary" data-toggle="modal" data-target="#myModal">click for details</button>';
              }
            } ]
            // scrollY:        200,
            // scrollCollapse: true,
            // scroller:       true
          })

          $('#dataTable tbody').on( 'click' ,'tr', function(){
              dummy = table.row(this).index()



          console.log(dummy);


              console.log(response.firstName);
             $('#content1').html('<p> First Name : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+response.data.data[dummy].firstName+'</p>');
             $('#content2').html('<p> Last Name : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+response.data.data[dummy].lastName+'</p>');
             $('#content3').html('<p> PhoneNumber : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+response.data.data[dummy].phoneNumber+'</p>');
             $('#content4').html('<p> Role : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+response.data.data[dummy].role+'</p>');
             $('#content5').html('<p> Service : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+response.data.data[dummy].service+'</p>');
             $('#content6').html('<p> Created Date : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+response.data.data[dummy].createdDate+'</p>');
            //  $('#content7').html('<p> Modified Date : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+response.modifiedDate+'</p>');
             $('#content8').html('<p> Username : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+response.data.data[dummy].username+'</p>');
             $('#content9').html('<p> Email : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+response.data.data[dummy].email+'</p>');
             $('#content10').html('<p> Email Verified : &nbsp;&nbsp;&nbsp;&nbsp;'+response.data.data[dummy].emailVerified+'</p>');
            //  $('#content11').html('<p> Id : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+response.id+'</p>');


        })

        }

      })

      $('[data-toggle="tooltip"]').tooltip();

      $('#logout').click(function(){

        // localStorage.removeItem('adminToken');
        // window.location.replace('http://localhost:4200/adminlogin')

        $.ajax({
          type: 'POST',
          url: "http://34.213.106.173/api/user/logout",
          dataType: "json",
          headers: {
            "Authorization": localStorage.getItem('adminToken')
          },

          success: function(response){
            alert("Log-out Successfully!!");
            localStorage.removeItem('adminToken');
            window.location.replace('http://localhost:4200/adminlogin');
          }
        })
      })



    })


  }

}


