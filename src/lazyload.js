//使用jQuery计算
//扩展为jquery插件，使用 $(selector).scrollLoad({})
(function($){
    $.fn.scrollLoading = function(options){
        var cfgs = {
            attr:'data-url',//存放属性的名称
            container:window, //默认为window
            callback:$.noop //空
        };

        var params = $.extned({}, cfgs, options || {});

        var container = $(params.container);

        //新建数组，用于存储每个dom对象数据
        params.cache = [];
        $(this).each(function(){
           // 取出jquery对象中每个dom对象的节点类型，取出每个dom对象上设置的图片路径
           var nodeName = this.nodeName.toLowerCase();
           var url = $(this).attr(params["attr"]);
           var data = {
               obj:$(this),
               tag:nodeName,
               url:url
           };

           params.cache.push(data);
        });

        var cb = function(call){
            if($.isFunction(params.callback)){
                params.callback.call(call);
            }
        };

        //每次触发滚动事件时，对每个dom元素与container元素进行位置判断，如果满足条件，就把路径赋予这个dom元素！
        var loading = function(){
            var containerHeight = container.outerHeight();
            var containerWidth = container.outerWidth();
            var contop, conleft;
             // 获取父元素相对于文档页顶部的距离，这边要注意了，分为以下两种情况；
             if(container.get(0) === window){
                //父元素为window,
                contop = $(window).scrollTop();
                conleft = $(window).scrollLeft();
             }else{
                // 第二种情况父元素为非window元素，获取它的滚动条滚动的距离；
                contop = container.offset().top;
                conleft = container.offset().left;
             }

             $.each(params.cache, function(i, data){
                 var o = data.obj, tag = data.tag, url = data.url, post, posb, posl, posr;
                 if(o){
                     //对象顶部与文档顶部之间的距离，如果它小于父元素底部与文档顶部的距离，则说明垂直方向上已经进入可视区域
                     post = o.offset().top - (contop+containerHeight);
                     posb = o.offset().top + o.height() - contop;

                    // 水平方向上同理；
                    posl = o.offset().left - (conleft + contWidth);
                    posr = o.offset().left + o.width() - conleft;

                     // 只有当这个对象是可视的，并且这四个条件都满足时，才能给这个对象赋予图片路径；
                    if ( o.is(':visible') && (post < 0 && posb > 0) && (posl < 0 && posr > 0) ) {
                        if (url) {
                            //在浏览器窗口内
                            if (tag === "img") {
                                //设置图片src
                                callback(o.attr("src", url));
                            } else {
                                // 设置除img之外元素的背景url
                                callback(o.css("background-image", "url("+ url +")"));
                            }
                        } else {
                            // 无地址，直接触发回调
                            callback(o);
                        }
                        // 给对象设置完图片路径之后，把params.cache中的对象给清除掉；对象再进入可视区，就不再进行重复设置了；
                        data.obj = null;
                    }

                 }
             });

             //加载完毕即执行
            loading();
            //滚动执行
            container.bind("scroll", loading);

        }
    }
})();