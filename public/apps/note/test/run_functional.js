//load('apps/client/run_functional.js')

load('apps/note/test/selenium_config.js'); //load selenium config
load('jmvc/rhino/loader.js');
rhinoLoader(function(){
    include.setPath('apps/note');
    include.plugins('test');
    include('test/functional.js');
});

OpenAjax.hub.subscribe("jquery.test.case.complete", jQuery.Test.report.caseComplete);
OpenAjax.hub.subscribe("jquery.test.test.complete", jQuery.Test.report.testCompete);
OpenAjax.hub.subscribe("jquery.test.functional.complete", jQuery.Test.report.testsComplete);
OpenAjax.hub.subscribe("jquery.test.test.start", jQuery.Test.report.startTest);
jQuery.Test.Functional.runAllBrowsers();
