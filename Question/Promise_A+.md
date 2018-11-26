# Promises/A+

`An open standard for sound,interoperable JavaScript promises - by implementers,for implementers.`

这是一个关于合理且有可操作性的`JavaScript prommises`的标准规范--来自于其制定者，也为了其实践者

`A promise represents the eventual result of an asynchrouous operation.The primary of interacting with a promise is through its then method,which registers callbacks to receive either a pomise's eventual value or the reaon why the promise cannont be fulfilled.`

`promise`代表着异步操作最终的结果。主要通过调用`promise`的`then`方法，该方法接受该`promise`最终操作的结果或者其无法完成的原因。

`This specification details the behavior of then method,providing an interoperable base which all Promises/A+ conformant promise implementations can be depended on to provide.As such,the specification should be considered very stable.Although the Promise/A+ organization may occasionally revise this specification with minor backwark-compatible changes to address newly-discovered corner cases,we will integrate large or backword-incompatible changes only ofter careful consideration, discussion,and testing.`

该说明将清晰地指出`then`方法的执行行为，并提供该可实行的基础，这些都是基于`Promise/A+`的标准来提供得到。因此，该说明被考虑得相当稳定。