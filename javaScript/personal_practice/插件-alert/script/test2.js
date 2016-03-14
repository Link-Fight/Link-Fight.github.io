define( function(require, factory) {
    'use strict';
    function Person(params) {
        this.age = 20;
        this.name = 'kelin';
    }
    
    return{
        MyPerson:Person
    };
});