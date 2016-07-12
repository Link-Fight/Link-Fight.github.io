// 定义组件
var Foo = Vue.extend({
    template: "#tpl"
})

var Bar = Vue.extend({
    template: '<p>This is bar!</p>'
})

var Baz = Vue.extend({
    template: '<p>This is Baz!</p>'
})

// 路由器需要一个根组件。
// 出于演示的目的，这里使用一个空的组件，直接使用 HTML 作为应用的模板
var App = Vue.extend({})

// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置
var router = new VueRouter()

// 定义路由规则
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
// 创建的组件构造函数，也可以是一个组件选项对象。
// 稍后我们会讲解嵌套路由
router.map({
    '/': {
        component: {
            template: "Hi!"
        }
    },
    '/foo': {
        component: Foo,
        subRoutes: {
            '/': {
                component: {
                    template: "<b>Hi@!</b>"
                }
            },
            '/bar': {
                component: Bar,
            },
            '/baz': {
                component: Baz
            }
        }
    },
    '/bar': {
        component: Bar,
        auth: true,
    },

})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '#app');
router.beforeEach(function (transition) {
    if (transition.to.auth) {
        console.log("Bar:auth");
        return true;
    }
})


function searchTwitter(term, onload, onerror) {

    var xhr, results, url;
    url = 'http://search.twitter.com/search.json?rpp=100&q=' + term;
    xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function (e) {
        if (this.status === 200) {
            results = JSON.parse(this.responseText);
            onload(results);
        }
    };

    xhr.onerror = function (e) {
        onerror(e);
    };

    xhr.send();
}

function handleError(error) {
    /* handle the error */
}

function concatResults() {
    /* order tweets by date */
}

function loadTweets() {
    var container = document.getElementById('container');

    searchTwitter('#IE10', function (data1) {
        searchTwitter('#IE9', function (data2) {
            /* Reshuffle due to date */
            var totalResults = concatResults(data1.results, data2.results);
            totalResults.forEach(function (tweet) {
                var el = document.createElement('li');
                el.innerText = tweet.text;
                container.appendChild(el);
            });
        }, handleError);
    }, handleError);
}