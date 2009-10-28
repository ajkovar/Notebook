/**
 * @tag controllers, home
 */
jQuery.Controller.extend('TrashController',
/* @Static */
{},
/* @Prototype */
{
  init : function(element) {
  	$(element).droppable(
	{
		activate : this.activate,
		deactivate : this.deactivate,
		over : this.over,
		out : this.out,
		drop : this.drop
	}
	);
  },
  activate : function(event, ui) {
  	$(this).animate({height:60})
  },
  deactivate : function(event, ui) {
	$(this).animate({height:0}).find("div").removeClass("active");;
  } ,
  over : function(event, ui) {
  	$(this).find("div").addClass("active");
  },
  out: function(event, ui){
  	$(this).find("div").removeClass("active");
  },
  drop : function(event,ui){
  	//ui.draggable.remove();
	var data = ui.draggable.data("*");
	var data2;
	
  }
});