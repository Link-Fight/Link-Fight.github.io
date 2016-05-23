!function (params) {
    var validator = {

        // 所有可以得验证规则处理类存放的地方
        type: [],
        //   验证类型对应的提示消息
        message: [],
        // 需要使用的验证类型
        config:[],
        
        validate:function(data) {
          var i,msg,type,checker,result_ok;  
        //   清空所有的错误消息
          this.message = [];
          
          for(i in data){
              if(data.hasOwnProperty(i)){
                  
              }
          }
        },
    };
} ();