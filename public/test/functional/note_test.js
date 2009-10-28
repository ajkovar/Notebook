jQuery.Test.Functional.extend('Tests.Functional.Note',{
    test_truth: function(){
        this.driver.waitForElementPresent('body', this.timeoutCallback('ready', 5000));
    },
    ready : function(){
        this.assert(true)
    }
});