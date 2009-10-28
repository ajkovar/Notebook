//js apps/hello_world/compress.js

include = {
    done : function(total){
        var compressed = include.collectAndCompress(total);
        new include.File('apps/hello_world/production.js').save(compressed);
        print("Compressed to 'apps/hello_world/production.js'.");
        include.plugins('documentation')
        var app = new include.Doc.Application(total, "hello_world");
        app.generate();
        print("Generated docs.");
        if(!window.MVCDontQuit) quit();
    },
    env: "compress"
}

load('jmvc/rhino/env.js');
Envjs('apps/hello_world/index.html', {scriptTypes : {"text/javascript" : true,"text/envjs" : true}});