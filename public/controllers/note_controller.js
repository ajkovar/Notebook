/**
 * @tag controllers, home
 */
jQuery.Controller.extend('NoteController',
/* @Static */
{},
/* @Prototype */
{
	init : function(elem){
		
		$(elem).droppable({
			drop: this.drop
		})
		.find("ul").children().note_tag_controller();
		
		this.copy = $(".note-text", elem);//.click(this.callback('noteClicked'));
		
		this.copy.srte({height:100});
	},
	drop : function(event, ui) {
		var parentId = ui.draggable.parent()[0].id;
		if(parentId === "sidebar-tags") {
			var clone = ui.draggable.clone();
			clone.note_tag_controller();
			$(this).find('ul').append(clone);
		}
		else if(parentId === "note-tags") {
			$(this).find('ul').append(ui.draggable.css({left:0,top:0}));
		}
	},
	noteClicked : function(event){
		var noteContent = this.copy;
		if (!this.active) {
			this.active=true;
			var content = noteContent.html();
			var self = this;

			
			
			//$().click(this.retrieveClickWhileFocusedHandler());
		}
	},
	noteClicked2 : function(event){
		var noteContent = this.copy;
		if (!this.active) {
			this.active=true;
			var html = noteContent.html();
			noteContent.html("<textarea>" + html + "</textarea>");


			/*
			 * Save the editor (a list of editors that should only contain one element is returned)
			 */
			this.editor = $("textarea", noteContent).rte({
                
				width: 450,
				height: 200,
                controls_rte: rte_toolbar,
                controls_html: html_toolbar
        	})[0];
			
			
			$().click(this.retrieveClickWhileFocusedHandler());
		}
	},
	retrieveClickWhileFocusedHandler : function() {
		var times = 0;
		var self = this;
		/*
		 * Use closure to keep track of the number of times this has been clicked
		 * This only done because the first click needs to be ignored
		 */
		return function(event){
			if (times>0 && self.active === true) {
				var parents = $(event.target).parents();
				var found = false;
				
				/*
				 * Search through the parents to see if they have clicked inside
				 * the the text area
				 */
				parents.each(function(){
					var other = self;
					if (this === other) { 
						found = true;
					}
				});
				
				/*
				 * If they clicked outside of it, then remove the text area
				 */
				if (!found) {
					self.active = false;
					var content = self.editor.get_content();
					//$("#currentSelection").remove();
					self.editor = null;
					self.copy.html(content);
					$().unbind('click', arguments.callee);
				}
			}
			times++;
			
			
		}
	}
});