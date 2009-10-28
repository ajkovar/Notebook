/**
 * Matches dropover, dropon, dropout, dropinit, dropmove, dropend
 * @tag drag, drop
 */
jQuery.Controller.Action.Respond.extend("jQuery.Controller.Action.Drop",
/* @static */
{
    match: new RegExp("(.*?)\\s?(dropover|dropon|dropout|dropinit|dropmove|dropend)$")
},
/* @prototype */
{});

/**
 * @tag drag, drop
 */
jQuery.Respond.extend("jQuery.Drop",{
	init : function(){
		this._super();
		jQuery.Drag.responder = this;  
		this.endName = 'dropon';
	}
},{})
