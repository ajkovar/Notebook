/**
 * @author alex
 */
(function($){
	$.widget("ui.srte", {
		_init : function() {
				var elem = this.element,
					options = this.options,
					content = elem.html(),
					base = "", 
					css = "", 
					style = "";
					
				this.iframe	= document.createElement("iframe");
				this.iframe.frameBorder = 0;
				this.iframe.frameMargin = 0;
				this.iframe.framePadding = 0;
				this.iframe.width = options.width || elem.width() || '100%';
				this.iframe.height = options.height || elem.height() || '100%';
				this.iframe.src	= "javascript:void(0);";
				
				elem.html(this.iframe);
				
				this.iframe_doc	= this.iframe.contentWindow.document;
				
				var doc = "<html><head>" + base + css + "</head><body>" + content + "</body></html>";
				
				try {
					this.iframe_doc.designMode = 'on';
				} catch ( e ) {
					// Will fail on Gecko if the editor is placed in an hidden container element
					// The design mode will be set ones the editor is focused
					$(this.iframe_doc).focus(function() { this.iframe_doc.designMode(); } );
				}
			
				this.iframe_doc.open();
				this.iframe_doc.write(doc);
				this.iframe_doc.close();
		},
		destroy: function() {
			if(!this.element.data(this.name)) 
				return;
			this.element.removeData(this.name);
		}
	});
}(jQuery))
