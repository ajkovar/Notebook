$.Controller.extend('TodosController',{
	mouseover: function(el){
		el.addClass("mouseover")
	},
	mouseout: function(el){
		el.removeClass("mouseover")
	}
});
$().todos_controller(); //add todos controller functionality to the document as a whole
