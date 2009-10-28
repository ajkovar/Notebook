
/**
 * Matches draginit, dragend, dragmove
 * @tag drag, drop
 */
jQuery.Controller.Action.Move.extend("jQuery.Controller.Action.Drag",
/* @static */
{
    /**
     * Matches "(.*?)\\s?(draginit|dragend|dragmove)$"
     */
    match: new RegExp("(.*?)\\s?(draginit|dragend|dragmove)$")
},
/* @prototype */
{});

/**
 * @tag drag, drop
 */
jQuery.Move.extend("jQuery.Drag",
{

},
{
    draw : function(pointer, event){
        

        // only drag if we haven't been cancelled;
        if(this._cancelled) return;

        var dragged_element_page_offset = this.movingElement.offsetv();          // where the drag element is in relation to the page, at this moment
        var dragged_element_css_offset = this.currentDelta();                   // the position as defined by the drag element's left + top css attributes
        var dragged_element_position_vector =                                   // the vector between the movingElement's page and css positions
            dragged_element_page_offset.minus(dragged_element_css_offset);

        var required_css_position = 
            pointer                                                             // where the mouse is at the moment
                .minus(dragged_element_position_vector)
                .minus(this.mouseElementPosition);                         // the offset between the mouse pointer and the representative that the user asked for

        this.move( event );

        if(!this._horizontal)    this.movingElement.css("top", required_css_position.top() + "px");
        if(!this._vertical)      this.movingElement.css("left", required_css_position.left() + "px");
        
        //Tell dropables where mouse is
        this.Class.responder.show(pointer, this, event);  
    }
}
);

