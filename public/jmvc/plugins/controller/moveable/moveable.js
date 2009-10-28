/**
 * 
 */
jQuery.Controller.Action.extend("jQuery.Controller.Action.Move",
/* @static */
{},
/* @prototype */
{    
    /**
     * Attaches a delegated mousedown function to the css selector for this action.  Saves additional actions
     * in callbacks.
     * @param {String} action_name the name of the function
     * @param {Function} f the function itself
     * @param {jQuery.Controller} controller the controller this action belongs to
     */
    init: function(action_name, callback, className, element){
		this._super(action_name, callback, className, element)
        this.css_and_event();
        var selector = this.selector();
        var delegates = this.delegates();
        var cn = this.Class.className.toLowerCase();
        if(!delegates[cn]) delegates[cn] = {};
        var data = delegates[cn];

        //If the selector has already been added, just add this action to its list of possible action callbacks
		if(data[selector]) {
            data[selector].callbacks[this.event_type] = callback;
            return;
        }
		//create a new mousedown event for selectors that match our mouse event
        var self  = this;
        data[selector] = new jQuery.Delegator(selector, 'mousedown', 
           function(event){
                self.mousedown.call(self,element, this, event)
           }, element);
        data[selector].callbacks = {};
        data[selector].callbacks[this.event_type] = callback;
    },
	/**
	 * Called when someone mouses down on a draggable object.
	 * Gathers all callback functions and creates a new Draggable.
	 */
	mousedown : function(element, el, event){

       var isLeftButton = event.button == 0 || event.button == 1;
       //var jmvc= jQuery.data(this.element,"jmvc");
       
       var mover = jQuery[this.Class.className]
       
	   if(mover.current || !isLeftButton) return;
	   
       //mover.current = new mover(callbacks, el, event);//why do this here?
     
       event.preventDefault();
       
       this._mousemove = jQuery.Function.bind(this.mousemove, this, el);
       this._mouseup = jQuery.Function.bind(this.mouseup, this);
       jQuery(document).bind('mousemove', this._mousemove);
       jQuery(document).bind('mouseup', this._mouseup);
	   return false;
	},
    mousemove : function(el, event){
        var mover = jQuery[this.Class.className];
        //check if we don't have a current:
		if(!mover.current){
			var callbacks = this.delegates()[this.Class.className.toLowerCase()][this.selector()].callbacks;
			mover.current = new mover(el, event, callbacks);
		}
		
        var pointer = event.pointer();
        if(mover.current._start_position && mover.current._start_position.equals(pointer)) return;
        event.preventDefault();
        mover.current.draw(pointer, event); //update draw
        return false;
    },
    mouseup : function(event){
        //if there is a current, we should call its dragstop
        
		var mover = jQuery[this.Class.className];
        var current = mover.current;

        if(current /*&& current.moved*/){
            current.end(event);
    		//mover.clear();
        }
        mover.current = null;
        jQuery(document).unbind('mousemove', this._mousemove);
        jQuery(document).unbind('mouseup', this._mouseup);
    }
});




/**
 * @hide
 * A draggable object, created on mouse down.  This basically preps a possible drag.
 * Start is called on the first mouse move after the mouse down.  This is to prevent drag from
 * being called on a normal click.
 * This function should do as little as possible.  Start should do more work because we are actually
 * dragging at that point.
 */
jQuery.Class.extend("jQuery.Move",{
    init : function(){
        this.lowerName = this.className.toLowerCase();
    },
    current : null
},
{
    /**
     * Saves callbacks, and sets element.  
     * Calculates where the mouse started on the page, and relative to the moving element
     * 
     * @param {Object} element
     * @param {Object} event
     * @param {Object} callbacks
     */
    init :  function( element, event,callbacks){
        element = jQuery(element);
        this.callbacks = callbacks;
        this.element = jQuery(element);         //the element that has been clicked on
                        						//if a mousemove has come after the click
        this._cancelled = false;                //if the drag has been cancelled

        this.mouseStartPosition = event.pointer(); //where the position is located

		var startElement = element;
		
		this.callInit(element, event);

        //Check what they have set and respond accordingly
        //  if they canceled
        if(this._cancelled == true) return;
        //if they set something else as the element
        this.movingElement = this.movingElement || this.element;
        this.mouseElementPosition = this.mouseStartPosition.minus( this.element.offsetv() );
        this.startPosition = startElement != this.movingElement ? this.movingElement.offsetv() : this.currentDelta();

        this.movingElement.makePositioned();
        this.movingElement.css('zIndex',1000);
        this.Class.responder.compile(event, this);
    },
    callInit : function(element, event){
        if(this.callbacks[this.Class.lowerName+"init"]) 
            this.callbacks[this.Class.lowerName+"init"](element, event, this  );
    },
    /**
     * Returns the position of the movingElement by taking its top and left.
     * @return {Vector}
     */
    currentDelta: function() {
        return new jQuery.Vector( parseInt( this.movingElement.css('left') ) || 0 , 
                            parseInt( this.movingElement.css('top') )  || 0 )  ;
    },
    //draws the position of the dragmove object
    draw: function(pointer, event){
        //fill in
		this.Class.responder.show(pointer, this, event);  
    },
    move : function(event){
        if(this.callbacks[this.Class.lowerName+"move"]) this.callbacks[this.Class.lowerName+"move"](this.element, event, this  );
    },
	/**
	 * Called on drag up
	 * @param {Event} event a mouseup event signalling drag/drop has completed
	 */
    end : function(event){

        this.Class.responder.end(event, this);

        if(this.callbacks[this.Class.lowerName+"end"])
            this.callbacks[this.Class.lowerName+"end"](this.element, event, this  );

        this.cleanup();
    },
	/**
	 * Cleans up drag element after drag drop.
	 */
    cleanup : function(){
        if (this.movingElement != this.element)
            this.movingElement.css({ display: 'none' });
    },
    /**
	 * Stops drag from running.
	 */
	cancel_drag: function() {
        this.drag_action._cancelled = true;
		this.drag_action.end(this.event);
		jQuery.Droppable.clear();
		jQuery.Draggable.current = null;
    },
    /**
	 * Clones an element and uses it as the representative element.
	 * @param {Function} callback
	 */
    ghost: function(callback) {
        // create a ghost by cloning the source element and attach the clone to the dom after the source element
        var ghost = this.element.cloneNode(true);
        jQuery.Element.insert(this.element, { after: ghost });
        
        // store the original element and make the ghost the dragged element
        this.movingElement = ghost;
    },
	/**
	 * Use a representative element, instead of the movingElement.
	 * @param {HTMLElement} element the element you want to actually drag
	 * @param {Number} offsetX the x position where you want your mouse on the object
	 * @param {Number} offsetY the y position where you want your mouse on the object
	 */
    representative : function( element, offsetX, offsetY ){
        this._offsetX = offsetX || 0;
        this._offsetY = offsetY || 0;

        var p = jQuery.event.fix(this.event);

        this.movingElement = jQuery(element);
        this.movingElement.css({
            top: (p.pageY - this._offsetY) + "px",
            left: (p.pageX - this._offsetX) + "px",
            display: 'inherit'
        });

        this.mouse_position_on_element = new jQuery.Vector(offsetX, offsetY)
    },
	/**
	 * Makes the movingElement go back to its original position after drop.
	 */
    revert : function(){
        //this.drag_action._revert = true;
    },
    /**
     * Isolates the drag to vertical movement.
     */
    vertical : function(){
        this.drag_action._vertical = true;
    },
    /**
     * Isolates the drag to horizontal movement.
     */
    horizontal : function(){
        this.drag_action._horizontal = true;
    },
    /**
     * Gets or sets the new position
     * @param {jQuery.Vector} newposition
     * @param {jQuery.Vector} the position the page will be updated to
     */
    position: function(newposition){
        if(newposition)
            this._position = newposition;
        return this._position;
    }
});