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
        $routeProvider.when("/login", {
            controller: "loginController",
            templateUrl: "login.html"
        });
        $routeProvider.when("/", {
            controller: "indexController",
            templateUrl: "login.html"
        });
    });
    app.controller('indexController', function($scope, $rootScope) {
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
            $rootScope.books.push({name:'R'+j, bookType: 'reference', shelf:column,borrowedBy:'reference',presence:'0'});
        }
        window.location = "#/login";
    });
    app.controller('loginController', function($scope, $rootScope) {
        $scope.name = "IndexView";
        $scope.validate = function () {
            username = $scope.username;
            password = $scope.password;
            if(username && password =="admin"){
                $rootScope.username = "admin";
                window.location = "#/librarian";
            }else if(username.charAt(0)=='U'||username.charAt(0)=='u'){
                $rootScope.username = username;
                $rootScope.numberOfBooks = 2;
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
        $scope.bookClick = function($bookName) {
            if($rootScope.numberOfBooks==2) {
                for (j = 0; j < $rootScope.books.length; j++) {
                    if ($rootScope.books[j].borrowedBy == $rootScope.username) {
                        $rootScope.numberOfBooks--;
                    }
                }
            }
            alert($rootScope.numberOfBooks);

                for (i = 0; i < $rootScope.books.length; i++) {
                    if ($rootScope.books[i].name == $bookName) {
                        if ($rootScope.books[i].presence == 1 && $rootScope.numberOfBooks > 0){
                            $rootScope.books[i].presence = 0;
                            $rootScope.books[i].borrowedBy = $rootScope.username;
                            $rootScope.numberOfBooks = $rootScope.numberOfBooks - 1;
                        }
                        else {
                            if ($rootScope.books[i].borrowedBy == $rootScope.username) {
                                $rootScope.books[i].presence = 1;
                                $rootScope.books[i].borrowedBy = "";
                                $rootScope.numberOfBooks = $rootScope.numberOfBooks + 1;
                            }
                            else {
                                alert("This book is not available.");
                            }
                        }
                    }
                }

            $scope.message = "Student Clicked " + $bookName;
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
                $rootScope.books.push({name:$scope.bookName, bookType: 'reference', shelf: $scope.Shelf, borrowedBy:'reference', presence: '0' });
            }else {
                $rootScope.books.push({name: $scope.bookName, bookType: 'ordinary', shelf: $scope.Shelf, borrowedBy: '', presence: '1'});
            }
        };

    });