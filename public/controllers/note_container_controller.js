/**
 * @tag controllers, home
 */
jQuery.Controller.extend('NoteContainerController',
/* @Static */
{

},
/* @Prototype */
{
    ready : function(){
		Note.findAll({}, this.callback('list'));
    },
    list : function(notes){
		this.render({html: this.element,data: {notes: notes}});
		$(".note").note_controller();
		
		$($(".note")[0]).find(".note-text").srte();
    }
	/*,
	dragon : function(element, event, movable){
		console.log("dragged on");
	},
	dropon : function(element, event, movable) {
		console.log("dropped on");
	},
	dropinit : function(element, event, movable) {
		console.log("dropped init");
	},
	dropover: function(element, event, movable) {
		console.log("drop over");
	}*/

});
$("#noteList").note_container_controller();
