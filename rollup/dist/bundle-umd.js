// @authur：kelin
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  // intro

  function say(name) {
    return `hello ${name}`
  }

  console.log(say('kelin'));



  // outro

})));
