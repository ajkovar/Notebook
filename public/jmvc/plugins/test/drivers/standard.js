(function(){
    
    
    
var Driver = function(){};

Driver.prototype = {
    selector : this.opener.jQuery,
    waitForElementPresent : function(css, callback){
        return this.waitForCondition("jQuery('"+css+"').length >= 1", callback)
    },
    getScrollHeight : function(css, time){
        
    },
    evalRemote : function(script){
        return eval("with(opener){"+script+"}");
    },
    deleteCookie : function(){
        return this.selenium.deleteCookie.apply(this.selenium, arguments);
    },
    waitForCondition : function(script, callback){
        var interval = null;
        interval = setInterval(function(){
            if(callback.failed){
                clearInterval(interval);
            }else{
                
                with(opener){
                    var result = eval("("+script+")")
                } 
                if( result ){
                    clearInterval(interval);
                    callback();
                }
            }
        }, 20);
    },
    dragAndDropToObject : function(drag, drop){
        
    },
    getElementPositionLeft : function(css){
        return this.selector(css).offset().left
    },
    getElementPositionRight : function(css){
        return this.selector(css).offset().right
    },
    getElementWidth : function(css){
        return this.selector(css).width();
    },
    getElementHeight : function(css){
        return this.selector(css).height();
    },
    getCookie : function(){
        this.evalRemote("document.cookie")
    },
    createCookie : function(nameValuePair, optionsString){
        return this.evalRemote("document.cookie=\""+nameValuePair+";"+optionsString+"\"");
    },
    deleteCookie : function(name, path){
        return this.evalRemote("document.cookie=\""+name+"=;path="+path+"\"");
    },
    dragAndDrop : function(drag, drop){
        var q = this.selector(drag)
        q.synthetic('drag',{to: this.selector(drop)});
    },
	text : function(css){
		return this.selector(css).text();
	}
};


var addFunction = function(fname){
    Driver.prototype[fname] = function(){
        var args = jQuery.makeArray(arguments);
        var css=args.shift();;
        args.unshift(fname)
        var sel = this.selector(css)
        return sel.synthetic(fname);
    }
}
 var funcs = ['click','contextmenu','dblclick','keydown','keyup','keypress','mousedown','mousemove','mouseout','mouseover','mouseup','reset','scroll','submit','focus','blur']
    for(var i = 0; i < funcs.length; i++)
        addFunction(funcs[i])



jQuery.Test.Functional.driver = new Driver();

})();





