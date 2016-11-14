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
    app.controller('loginController', function($scope) {
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
        this.books[0] = {name: 'book1', id: '1', category: 'Sport'};
        this.books[1] = {name: 'book2', id: '2', category: 'Art'};
        this.books[2] = {name: 'book3', id: '3', category: 'Sport'};
        this.books[3] = {name: 'book4', id: '4', category: 'Art'};
    });

    app.controller('studentController', function ($scope, libraryService) {
        $scope.name = "Student";
        $scope.library = libraryService.books;
        $scope.message = "Nothing clicked yet.";
        $scope.bookClick = function() {
            $scope.message = "Student Click!";
        };
    });
    app.controller('librarianController', function ($scope, libraryService) {
        $scope.name = "Librarian";
        $scope.library = libraryService.books;
        $scope.message = "Nothing clicked.";
        $scope.bookClick = function() {
            $scope.message = "Librarian Click!";
        };
    });