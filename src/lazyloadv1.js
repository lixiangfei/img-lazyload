/**
 * 使用窗口计算的方式，需要获取多个窗口数据，计算复杂
 * 可以使用IntersectionObserver api来实现图片懒加载，IntersectionObserver为开发这一宫了一种可以异步监听目标元素与其祖先或视窗
 * 交叉状态的手段。祖先元素与视窗被称为根
 * 
 * 
 *  root 用于观察的根元素，默认是浏览器的适口，也可以指定具体的元素，指定元素时候用于观察的元素必须是指定元素的子元素
 *  threshold 用来指定交叉,懒加载不用该参数
 * rootMargin:'0px 10px 30px 20px' 用来扩大或缩小视窗的大小，使用css方法定义  0px 10px 30px 20px表示top、right、bottom 和 left的值
 * options{
 *  root:null,
 *  threshold:[0, 0.5, 1]  0，0.5，1，当观察元素img0%、50%、100%时候就会触发回调函数
 * }
 */

 function lazyLoad(options){
       var cfgs = {
            attr:'data-url',//存放属性的名称
            container:null, //默认为window
        };

        var params = Object.assign({}, cfgs, options || {});

        var attrKey = params.attr.split('data-')[1];
        var isWindow = !params.container || (params.container && params.container.window === window); //null, '',window,则root为默认
        var ioRoot = isWindow? null : document.querySelector(params.container); //未查询到则默认视窗为window
        params['root'] = ioRoot;
        params['threshold'] = undefined;


        
        function callback(entries){
            entries.forEach((item)=>{ //item为IntersectionObserverEntr为对象
                if(item.isIntersecting){ //当前元素可见
                    item.target.src = item.target.dataset[attrKey];
                    io.unobserve(item.target); //停止观察当前元素，避免不可见时候再次调用callback函数
                }
            });
        }

        //callback 当元素的可见性变化时，就会触发callback函数，callback函数会触发两次，元素进入视窗（开始可见时）和元素离开视窗（开始不可见时）都会触发
        const io = new IntersectionObserver(callback, params);

        var rootElem = isWindow ? document : document.querySelector(params.container);
        rootElem = rootElem == null ? document : rootElem;
        var imgs = rootElem.querySelectorAll(`[${params.attr}]`);


        imgs.forEach((item)=>{// io.observe接受一个DOM元素，添加多个监听 使用forEach
            io.observe(item);
        })

 }

 module.exports = lazyLoad;