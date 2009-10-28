/**
 * @add jQuery.Controller Prototype
 */

jQuery.Controller.prototype.
/**
 * @tag view
 * Renders a View template with the controller instance. If action or partial 
 * are not supplied in the options, 
 * it looks for a view in app/views/controller_name/action_name.ejs
 * 
 * @codestart
 * TasksController = MVC.Controller.extend('tasks',{
 *   click : function(params){
 *     // can display with &lt;%= data %>
 *     this.data = "Hello_world"                            
 *     // renders with views/tasks/under.ejs
 *     this.render({after: params.element, action: "under"}) 
 *     // renders with views/tasks/click.ejs
 *     this.render({to: "element_id"})
 *     // renders with views/bee/_sugar.ejs                      
 *     this.render({top: "another_e", partial: "bee/sugar")) 
 *   }
 * })
 * @codeend
 * @plugin controller/view
 * @return {String} the result of the render.
 * @param {Object} options A hash with the following properties
 * <table class="options">
					<tbody><tr><th>Option</th><th>Default</th><th>Description</th></tr>
					<tr>
						<td>action</td>
						<td>null</td>
						<td>If present, looks for a template in app/views/<i>controller_name</i>/<i>action</i>.ejs
						</td>
					</tr>
					<tr>
						<td>partial</td>
						<td>null</td>
						<td>A string value that looks like: 'folder/template' or 'template'.  If a folder is present,
						    it looks for a template in app/views/<i>folder</i>/_<i>template</i>.ejs; otherwise,
							it looks for a template in app/views/<i>controller_name</i>/_<i>template</i>.ejs.
						</td>
					</tr>
					<tr>
						<td>to</td>
						<td>null</td>
						<td>If present, a HTMLElement or element ID whose text will be replaced by the render.
						</td>
					</tr>
					<tr>
						<td>before, after, top, bottom</td>
						<td>null</td>
						<td>If present, the content will be placed relative to 
						the HTMLElement or element ID.
						</td>
					</tr>
					<tr>
						<td>text</td>
						<td>null</td>
						<td>Instead of using a view to generate text, it uses the text as the rendered text.
						</td>
					</tr>
					<tr>
						<td>using</td>
						<td>null</td>
						<td>If present, renders with the data in using instead of the controller instance.  This is important for
						stateful controllers.
						</td>
					</tr>
				</tbody></table>
	 
 */
render = function(options) {
		var result, render_to_id = jQuery.RENDER_TO, plugin_url;
		var controller_name = this.Class.underscoreName;
		var action_name = this.called;
        if(!options) options = {};
        
        var helpers = {};
        if(options.helpers){
            for(var h =0; h < options.helpers.length; h++){
                jQuery.extend(helpers, options.helpers[h] );
            }
        }else{
            if(this._default_helpers ) helpers = this._default_helpers
            //load from name
            var current = window;
            var parts = this.Class.fullName.split(/\./);
            for(var i =0; i < parts.length; i++){
                if(typeof current.Helpers == 'object'){
                    jQuery.extend(helpers, current.Helpers );
                }
                current = current[parts[i]];
            }
            if(typeof current.Helpers == 'object'){
                    jQuery.extend(helpers, current.Helpers );
            }
            this._default_helpers = helpers;
        }
        
		if(typeof options == 'string'){
			result = new jQuery.View({view:  options  }).render(this, helpers);
		}
		else if(options.text !== undefined && options.text !== null) {
            result = options.text;
        }
        else {
            var convert = function(url){
				var url =  jQuery.String.include(url,'/') ? url : controller_name+'/'+url;
				var url = url + jQuery.View.ext;
				return url;
			};
			if(options.plugin){
                plugin_url = '../jmvc/plugins/'+options.plugin;
            }
            
			if(options.view) {
				var url = '../views/'+convert(options.view);
            }else
            {
                var url = '../views/'+controller_name+'/'+action_name.replace(/\.|#/g, '').replace(/ /g,'_')+jQuery.View.ext;
            }
			var data_to_render = options.data || this;
			if(options.locals) {
				for(var local_var in options.locals) {
					data_to_render[local_var] = options.locals[local_var];
				}
			}
            var view;
            if(!plugin_url){
            	view = new jQuery.View({view:  new include.File(url).join_from(this.Class._path)  }); //what about controllers in other folders?
            }else{
                //load plugin if it has been included
                try{
                    var view = new jQuery.View({view:  jQuery.View.get(plugin_url) ? plugin_url :  url  });
                }catch(e){
                    if(e.type !='JMVC') throw e;
                    var view = new jQuery.View({view:  plugin_url  });
                }
            }
            result = view.render(data_to_render, helpers);
		}
		
		var locations = ["prepend","append","after","before","replace","text","html"];
		var element = null;
		for(var l =0; l < locations.length; l++){
			if(! options[locations[l]] ) continue;
			var query = options[locations[l]] ;
			if(typeof  query == 'string'){ // now it is a jQuery
				query = this.find( query );
			}else if( query.nodeName ){
				query = jQuery(query);
			}
			query[locations[l]  ].call(query, result);
		}
		
		
		return result;
};