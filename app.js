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
            $rootScope.books.push({name:'B'+i,shelf:column,borrowedBy:'',presence:'1'});
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
            $rootScope.books.push({name:'R'+j,shelf:column,borrowedBy:'',presence:'0'});
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

    app.service('libraryService', function(){
        this.books = [];
        this.books[0] = {name: 'book1', shelf: 'Literature', borrowedBy: '', presence:'1'};
        this.books[1] = {name: 'book2', shelf: 'Science', borrowedBy: '', presence:'1'};
        this.books[2] = {name: 'book3', shelf: 'Sport', borrowedBy: '', presence:'1'};
        this.books[3] = {name: 'book4', shelf: 'Art', borrowedBy: '', presence:'1'};
        this.books[4] = {name: 'book5', shelf: 'Literature', borrowedBy: '', presence:'1'};
        this.books[5] = {name: 'book6', shelf: 'Science', borrowedBy: '', presence:'1'};
        this.books[6] = {name: 'book7', shelf: 'Sport', borrowedBy: '', presence:'1'};
        this.books[7] = {name: 'book8', shelf: 'Art', borrowedBy: '', presence:'1'};
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
        $scope.bookClick = function() {
            $scope.message = "Librarian Click!";
        };

        $scope.addRow = function(){
            $rootScope.books.push({name:$scope.bookName, shelf: $scope.Shelf, borrowedBy:'', presence: '1' });
        };

    });