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
        this.books[0] = {name: 'book1', id: '1', borrowedBy: '', presence:'1'};
        this.books[1] = {name: 'book2', id: '2', borrowedBy: '', presence:'1'};
        this.books[2] = {name: 'book3', id: '3', borrowedBy: '', presence:'1'};
        this.books[3] = {name: 'book4', id: '4', borrowedBy: '', presence:'1'};
        this.books[4] = {name: 'book5', id: '5', borrowedBy: '', presence:'1'};
        this.books[5] = {name: 'book6', id: '6', borrowedBy: '', presence:'1'};
        this.books[6] = {name: 'book7', id: '7', borrowedBy: '', presence:'1'};
        this.books[7] = {name: 'book8', id: '8', borrowedBy: '', presence:'1'};

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
        $scope.splitData = splitIntoRows(libraryService.books,4);

        $scope.addBook = function() {
            libraryService.books.push({name: $scope.bookName,id:$scope.Shelf,borrowedBy:'',presence:'1'});
        };

        function splitIntoRows(items, itemsPerRow) {
            var rslt = [];
            items.forEach(function(item, index) {
                var rowIndex = Math.floor(index / itemsPerRow),
                    colIndex = item.id % itemsPerRow;
                if (!rslt[rowIndex]) {
                    rslt[rowIndex] = [];
                }
                rslt[rowIndex][colIndex] = item;
            });
            return rslt;
        }
    });