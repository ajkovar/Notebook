if(typeof SeleniumDefaults != "undefined"){
    


importClass(Packages.com.thoughtworks.selenium.DefaultSelenium);

//first lets ping and make sure the server is up

(function(){
    var xhr = jQuery.ajax({type: "get", url: "http://"+SeleniumDefaults.serverHost+":"+SeleniumDefaults.serverPort,async: false});
    if(!xhr.status){
        print("!!!\n You haven't started your selenium server or configured JMVC to look in the wrong place.\n Start with 'js -selenium'.\n")
        
        throw "You must start your selenium server.  Use 'js -selenium'."
    }
})();



SeleniumDriver = function(browserStartCommand){
    this.selenium = new DefaultSelenium(
                        SeleniumDefaults.serverHost, 
                        SeleniumDefaults.serverPort, 
                        browserStartCommand, 
                    	SeleniumDefaults.browserURL);
    this.selenium.start();
    this.selenium.open(SeleniumDefaults.browserURL);
}
SeleniumDriver.prototype = {
    waitForElementPresent : function(css, callback){
        this.selenium.waitForCondition("selenium.isElementPresent('css="+css+"')", callback.timeout);
        callback();
    },
    getScrollHeight : function(css, time){
        
    },
    eval : function(script){
        return this.selenium.getEval(script);
    },
    evalRemote : function(script){
        return this.eval("with(selenium.browserbot.getCurrentWindow()){"+script+"}")
    },
    deleteCookie : function(){
        return this.selenium.deleteCookie.apply(this.selenium, arguments);
    },
    dragAndDrop: function(drag, drop){
        return this.selenium.dragAndDropToObject("css="+drag, "css="+drop)
    },
	text : function(css){
		return this.selenium.getText("css="+css);
	}
};



(function(){
    var addFunction = function(fname){
        SeleniumDriver.prototype[fname] = function(){
            var args = jQuery.makeArray(arguments);
            
            if(args.length >= 1)
                args[0] = "css="+args[0];
            return this.selenium[fname].apply(this.selenium, args)
        }
    }

    var funcs = ['isVisible','type','click','getElementHeight','stop']
    for(var i = 0; i < funcs.length; i++)
        addFunction(funcs[i])
})();

}
