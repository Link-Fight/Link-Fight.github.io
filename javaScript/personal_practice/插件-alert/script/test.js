define( function(require, factory) {
    'use strict';
    var name = "kelin";
    return {
        say:function(params) {
            console.log(name+" "+params);
        }
    }
});