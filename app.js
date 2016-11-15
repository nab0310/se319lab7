/**
 * Created by nab0310 on 11/13/2016.
 */
var app = angular.module('myApp', ['ngRoute']); //ngRoute is an angular service

    app.config(function ($routeProvider) {
        $routeProvider.when("/librarian",{
            controller:"librarianController",
            templateUrl: "librarian.html"
        });
        $routeProvider.when("/student",{
            controller:"studentController",
            templateUrl: "student.html"
        });
        $routeProvider.when("/", {
            controller: "loginController",
            templateUrl: "login.html"
        });
    });
    app.controller('loginController', function($scope, $rootScope) {
        $rootScope.books =[];
        column ="";
        for(i=0;i<20;i++){
            if(i%4==0){
                column = "Literature";
            }
            if(i%4==1){
                column = "Science";
            }
            if(i%4==2){
                column = "Sport";
            }
            if(i%4==3){
                column = "Art";
            }
            $rootScope.books.push({name:'B'+i,bookType: 'ordinary', shelf:column, borrowedBy:'',presence:'1'});
        }
        for(j=0;j<5;j++){
            if(j%4==0){
                column = "Literature";
            }
            if(j%4==1){
                column = "Science";
            }
            if(j%4==2){
                column = "Sport";
            }
            if(j%4==3){
                column = "Art";
            }
            $rootScope.books.push({name:'R'+j, bookType: 'reference', shelf:column,borrowedBy:'',presence:'0'});
        }
        $scope.name = "IndexView";
        $scope.validate = function () {
            username = $scope.username;
            password = $scope.password;
            if(username && password =="admin"){
                localStorage.setItem("username",username);
                localStorage.setItem("NumberOfBooks",2);
                window.location = "#/librarian";
            }else if(username.charAt(0)=='U'||username.charAt(0)=='u'){
                localStorage.setItem("username",username);
                localStorage.setItem("NumberOfBooks",2);
                window.location = "#/student";
            }
            else{
                alert("Incorrect Username and Password!")
            }
        }
    });

    app.controller('studentController', function ($scope, $rootScope) {
        $scope.name = "Student";
        $scope.library = $rootScope.books;
        $scope.message = "Nothing clicked yet.";
        $scope.bookClick = function() {
            $scope.message = "Student Click!";
        };
    });
    app.controller('librarianController', function ($scope, $rootScope) {
        $scope.name = "Librarian";
        $scope.library = $rootScope.books;
        $scope.message = "Nothing clicked.";
        $scope.bookClick = function(name,type,borrowedBy,presence) {
            alert("Name: "+name+", Type: "+type+", BorrowedBy: "+borrowedBy+", presence: "+presence);
            $scope.message = "Librarian Click!";
        };

        $scope.addRow = function(){
            if($scope.Reference==1){
                $rootScope.books.push({name:$scope.bookName, bookType: 'reference', shelf: $scope.Shelf, borrowedBy:'', presence: '0' });
            }else {
                $rootScope.books.push({name: $scope.bookName, bookType: 'ordinary', shelf: $scope.Shelf, borrowedBy: '', presence: '1'});
            }
        };

    });