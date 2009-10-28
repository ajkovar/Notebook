/*
 * @page getstarted 2. Get Started
 * @tag home, get started
 * <h1>Get Started</h1>
 * This guide introduces the most important aspects of JavaScriptMVC by walking through
 * creating a simple Hello World application.
 * <h2>Basics</h2>
 * Before jumping in, there are some things you should know:
 * <h3>Organization</h3>
 * Files are logically separated so you can quickly find what you're looking for.<br/>
 * JavaScriptMVC's application structure:<br/>
 * <img src='http://javascriptmvc.com/wiki/images/d/d7/File_structure.png'/>
 * <h3>Plugin System</h3>
 * Everything is a plugin.  You just need to include the ones you need. Plugins will load their
 * own dependencies.  
 * <h3>Environment Modes</h3>
 * There is a different environment for each phase of development:
 * <ul>
 *     <li><span class='gray'>Development</span> - optimized for debugging</li>
 *     <li><span class='gray'>Test</span> - loads console and application tests</li>
 *     <li><span class='gray'>Production</span> - loads compressed application file </li>
 * </ul>
 * <h2>Creating Hello World</h2>
 * This section walks you through writing "Hello World" to the page after a page loads. 
 * Here's what needs to be done:
 * <ol>
 *     <li>Install JavaScriptMVC </li>
 *     <li>Create an application </li>     
 *     <li>Generate a controller</li>
 *     <li>Include your controller</li>
 *     <li>Run your Hello World application </li>
 * </ol>   
*/
//break


/*
@page install 2.1. Installing JavaScriptMVC

<h1>Installing JavaScriptMVC</h1>
<p>Download the latest JavaScriptMVC. Unzip the folder on your file system or web server.  If you are using this on a webserver, put JMVC in a public folder.</p>
<p>A simple JavaScriptMVC application, similar to what you'll create shortly, is running in index.html. You may want to refer to this as a reference.
</p>
Update JavaScriptMVC to the latest/best code.  In a console, type: 
@codestart text
C:\workspace\HelloWorld>js jmvc\update
@codeend
 */
//break ---------------------------------------------------------------------

/*
@page creating 2.2. Creating HelloWorld
<h1>Creating HelloWorld</h1>
<p>JavaScriptMVC uses generator scripts to assist you in setting up your application's files and folders.
</p>
<h2>Generating an Application</h2>
<p>To create your application, open a console window and navigate to your public directory. Run:
</p>
@codestart text
C:\workspace\HelloWorld>js jmvc\generate\app hello_world
Generating...

             apps/hello_world
             apps/hello_world/init.js
             apps/hello_world/compress.js
             apps/hello_world/index.html
             apps/hello_world/test
             apps/hello_world/test/unit.js
             apps/hello_world/test/run_unit.js
             apps/hello_world/test/functional.js
             apps/hello_world/test/run_functional.js
             apps/hello_world/test/selenium_config.js
             test/unit/truth_test.js
             test/functional/truth_functional_test.js

             Make sure to add new files to your application and test file!
@codeend

<p>This script creates an application folder and files. 
The most important is the application file (<span class='highligh'>init.js</span>), 
which JavaScriptMVC applications use to load plugins and 
other JavaScript files.
</p>
<p>Create an HTML page that loads your application by runing:
</p>
@codestart text
C:\workspace\HelloWorld>js jmvc/generate/page hello_world index.html
Generating ... index.html
@codeend
<p>This script creates index.html, which loads your application file.
</p>
<h2>Generate a Controller</h2>

<p>Controllers are organized collections of event handlers. We'll create one and load it using the application file.
</p>
<p>Run the following in a console to generate a controller:
</p>
@codestart text
C:\workspace\HelloWorld>js jmvc/generate/controller HelloWorld
Generating ... 
              controllers
              controllers/hello_world_controller.js
              test/functional/hello_world_test.js
              views/hello_world

              Make sure to add new files to your application and test file!
@codeend
<p>Two files were created: a controller file and a controller test file. 
Testing is discussed in the next section.
</p>
<p>Now we'll add code that writes "Hello World" once the page has loaded. 
Paste the following in hello_world_controller.js:
</p>
@codestart
jQuery.Controller.extend('HelloWorldController',
/* @Static *|
{
    onDocument: true
},
/* @Prototype *|
{
    ready : function(){
        $(document.body).append("&lt;h2>Hello World&lt;/h2>");
    }
});
@codeend
<p>This makes HelloWorldController to respond to the document's ready event and write Hello World to the page. 
</p>
<h2>Include the Controller</h2>
<p>You need to include hello_world_controller.js in the list of scripts your application loads. 
To do so, include the file in your application's application file.
 Add the following to <span class='highlight'>apps/hello_world/init.js</span>:
</p>
@codestart
include.resources();
include.plugins('controller','view');
 
include(function(){ //runs after prior includes are loaded
  include.models();
  include.controllers('hello_world'); // adds  ../controllers/hello_world_controller.js
  include.views();
});
@codeend
<p>When the page loads, the application file will load some basic plugins followed by your controller. 
<span class='highlight'>Include all files in this manner</span>. </p>

<h2>Run HelloWorld</h2>
<p>That's it. You've created a simple Hello World application. Open index.html in a browser. 
<p>
<img src='http://javascriptmvc.com/wiki/images/5/54/Hello_world.png'/>
*/
//break ----------------------------------------------------------------------


/*
@page testing 2.3. Testing HelloWorld
<h1>Testing HelloWorld
</h1>
<p>The Test plugin's tiered approach allows you to
easily, raplidly, and comprehensively test your application. 
This section will go over testing your simple Hello World application.
</p>
<h2>Testing in the Browser
</h2>
<p>When applications are generated, by default they include a simple unit and functional test.</p>
<p>To run these tests, open the index.html page you created previously and 
change the src attribute of the script tag that loads include.js like this:</p>
@codestart html
&lt;script type='text/javascript' src='jmvc/include.js?hello_world,<span style="text-decoration:underline"><b>test</b></span>'>&lt;/script>
@codeend
<p>Reload your page. The JavaScriptMVC Console will load in another window:</p>
<h3>JavaScriptMVC Console</h3>
<img src='http://javascriptmvc.com/wiki/images/9/9f/Console_2_0.png'/>
<p class='warn'>If you don't see the console appear, turn off your popup blocker!</p>

<h3>Run Tests</h3>
<p>To run the simple 'truth' tests, click the <b>unit</b> and <b>functional</b> tabs
and click the play buttons.</p>
<img src='http://javascriptmvc.com/wiki/images/1/12/Test_finished.png' />
<h2>Writing Tests</h2>
<p>JavaScriptMVC supports 2 types of tests:</p>
<DL>
    <DT><STRONG>Unit</STRONG>
    <DD>Test basic, low level functionality such as Models.
    <DT><STRONG>Functional</STRONG>
    <DD>Test user interactions, typically Controllers.
</DL>
<p>Let's write a functional test that makes sure "Hello World" is present.</p>
<p>When we generated the hello_world_controller, 
the script also created a <b>hello_world_controller_test.js</b> in test/functional.
</p>
<p>Replace the code in test/functional/hello_world_controller_test.js with the following:
</p>
@codestart
jQuery.Test.Functional.extend('Tests.Functional.HelloWorld',{
    test_<b>helloWorldPresent</b>: function(){
        this.driver.waitForElementPresent('body', this.timeoutCallback('ready', 5000));
    },
    ready : function(){
        <b>this.assertEqual("Hello World",this.driver.text("h2"));</b>
    }
});
@codeend
<p>
This waits until the page loads, 
then asserts Hello World has been inserted into the page correctly. 
Include the hello_world_test in
<b>apps/hello_world/test/functional.js</b> with the following:</p>
@codestart text
include.functionalTests("hello_world");
@codeend
Reload your page and run the test.
</p>
<h2>More on Testing</h2>
<p>There is a lot more to know about testing.  For example, you can easily run your unit and functional
tests in Rhino and Selenium.  To learn this and more, read the [jQuery.Test test documentation].
*/
//break ----------------------------------------------------------------------

/*
@page compressing 2.4. Compressing HelloWorld
<h1>Compressing Hello World</h1>

<p>There is a large overhead associated with downloading many JavaScript files. 
Never burden your users with many downloads! 
Server side compression makes it simple to concatenate and compress your code into one file.</p>
<h2>Compress Script
</h2>
<p>To compress your application, run the following command from a console:
</p>
@codestart
C:\workspace\HelloWorld>js apps/hello_world/compress.js
   ../../apps/hello_world.js
   jmvc/plugins/core/setup.js
   jmvc/plugins/lang/standard_helpers.js
   plugins/lang/inflector/inflector.js
   plugins/dom/event/standard.js
   plugins/io/ajax/ajax.js
   plugins/lang/class/setup.js
@codeend
<p>When you generated your application, apps/hello_world/compress.js was automatically created. 
The command above loaded this script, 
which loaded all your application files in the Rhino JavaScript runtime, 
compressed them, and saved them in <b>apps/hello_world/production.js</b>.
</p>
<p>Verify that production.js was created.</p>
<h2>Switch to production mode
</h2>
<p>Turn on production mode by changing the part of the src tag in index.html that says test to production like this:
</p>
@codestart html
&lt;script type='text/javascript' src='jmvc/include.js?hello_world,<span style="text-decoration:underline;"><b>production</b></span>'>&lt;/script>
@codeend
<h2>Reload and verify</h2>

<p>Reload your page. Only two JavaScript files will load: include.js and production.js. Not bad considering 28 files are loaded in development mode.</p>

*/
//break ----------------------------------------------------------------------

/*
@page documenting 2.5. Documenting HelloWorld
<h1>Documenting HelloWorld</h1>

<p>Documentation is an important step in creating maintainable code. 
It's often burdensome on developers so it becomes a neglected. 
JavaScriptMVC's integrated documentation makes it easy to document JavaScript.
</p>
<h2>Add comments
</h2>
<p>Add the following comments to controllers/hello_world_controller.js:
</p>
@codestart
/**
* * @tag controllers, home
* * A Controller that prints "Hello World" when the document is ready. 
* *|
jQuery.Controller.extend('HelloWorldController',
/* @Static *|
{
    onDocument: true
},
/* @Prototype *|
{
*  /**
*   * When the document is ready, append Hello World do the body
*   * @param {jQuery.fn} el jquery wrapped element
*   * @param {Event} ev jquery wrapped event
*   *|
    ready : function(el, ev){
        $(document.body).append("&lt;h2>Hello World&lt;/h2>");
    }
});
@codeend
<p>
The documentation generator will create a formatted HTML page documenting the HelloWorldController class.
</p>
<h2>Generate documentation
</h2>
<p>You may have noticed when you compressed your application, documentation was generated. Run the compressor script again to generate documentation for the HelloWorldController class:
</p>
@codestart text
C:\workspace\HelloWorld>js apps\hello_world\compress.js
@codeend
You'll see the following in the printed output:
@codestart
   jmvc/plugins/util/file/init.js
   jmvc/plugins/util/compress/compress.js
Generated docs.
@codeend

<h2>View documentation
</h2>
<p>The script filled your apps/hello_world/docs folder with your apps data. Open <b>hello_world_doc.html</b> (in your root directory) and click HelloWorldController:
</p>
<img src='http://javascriptmvc.com/wiki/images/a/a9/Docs_2_0.png' />

<h2>Next steps
</h2>

<p>In the context of this trivial application, you've been exposed to major tenets of JavaScriptMVC: code separation, testing, compression, and documentation. This is pretty cool! Look at how simply you went from nothing to a compressed and tested application.
</p>
*/
//break ----------------------------------------------------------------------