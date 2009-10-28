/**
 * @tag controllers, home
 */
jQuery.Controller.extend('TagController',
/* @Static */
{
},
/* @Prototype */
{
    init : function(element){
		this._super(element);
		
		$(element).draggable({ revert: 'invalid', opacity: 0.7, helper: 'clone', refreshPositions: true });
    }
});
