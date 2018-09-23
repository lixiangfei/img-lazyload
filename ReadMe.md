### 图片滚动懒加载
    当访问一个页面的时候，先把img元素或是其他元素的背景图片路径替换成 替代图片(1px*1px,减少请求数)，只有当图片出现在浏览器的可视区域内时，才设置图片真正的路径，让图片显示出来。这就是图片的懒加载

### 优点
    减少服务器压力，能更快的显示页面

### 实现思路
    1.页面中的img元素，开始不设置url,使用data属性存在真正的图片地址
    2.当图片进入可视区域时，在设置src属性

    第一种
        使用IntersectionObserver懒加载 (部分游览器支持)
    第二种
        通过获可视区大小，滚动距离等数据，进行判断

    1. 屏幕可视窗口大小
        window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    
        $(window).height();
    
    2.浏览器窗口顶部与文档顶部之间距离(滚动距离)
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

        $(document).scrollTop()
    
    3.获取元素尺寸
        $(o).width = o.style.width;
        $(o).innerWidth = o.style.width+o.style.padding;
        $(o).outerWidth = o.styleWidth = o.style.width+o.style.padding+o.style.border;
        $(o).outerWidth(true) = o.style.width+o.style.padding+o.style.border+o.style.margin;

        要使用原生的style.xxx方法获取属性，这个元素必须已经有内嵌的样式，如<div style="...."></div>；
        如果原先是通过外部或内部样式表定义css样式，必须使用o.currentStyle[xxx] || document.defaultView.getComputedStyle(0)[xxx]来获取样式值
    4.获取位置信息
    