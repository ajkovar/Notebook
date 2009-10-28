/**
 * @tag controllers, home
 */
jQuery.Controller.extend('NoteTagController',
/* @Static */
{},
/* @Prototype */
{
    init : function(element){
		$(element).draggable({
			revert: 'invalid', opacity: 0.7, refreshPositions: true
		});
	}
});