



(function(){
    var Synthetic = function(type, options){
    	this.type = type;
    	this.options = options || {};
    }

    Synthetic.prototype = 
    {
    	/**
    	 * Dispatches the event on the given element
    	 * @param {HTMLElement} element the element that will be the target of the event.
    	 */
        send : function(element){
    		this.firefox_autocomplete_off(element);
    		
    		if(jQuery.browser.opera && jQuery.Array.include(['focus','blur'],this.type)) return this.createEvents(element);
    		
    		if(this.type == 'focus') return element.focus();
    		if(this.type == 'blur') return element.blur();
    		if(this.type == 'write') return this.write(element);
    		if(this.type == 'drag') return this.drag(element);
    		
    		return this.create_event(element)
    	},
    	firefox_autocomplete_off : function(element) {
    		if(jQuery.browser.mozilla && element.nodeName.toLowerCase() == 'input' && element.getAttribute('autocomplete') != 'off')
    			element.setAttribute('autocomplete','off');
    	},
        /**
         * Picks how to create the event
         * @param {Object} element
         */
    	create_event: function(element){
    		if(document.createEvent) {
    			this.createEvent(element);
    		} else if (document.createEventObject) {
    			this.createEventObject(element);
    		} else
    			throw "Your browser doesn't support dispatching events";
    		return this.event;
    	},
        /**
         * Most browsers do this
         * @param {Object} element
         */
    	createEvent : function(element) {
    		if(jQuery.Array.include(['keypress','keyup','keydown'], this.type))
    			this.createKeypress(element, this.options.character);
    		else if(this.type == 'submit')
    			this.createEvents(element);
    		else if(jQuery.Array.include(['click','dblclick','mouseover','mouseout','mousemove','mousedown','mouseup','contextmenu'],this.type))
    			this.createMouse(element);
    	},
        /**
         * For IE
         * @param {Object} element
         */
    	createEventObject : function(element) {
    		this.event = document.createEventObject();
            if(jQuery.Array.include(['keypress','keyup','keydown'],this.type))
    			this.createKeypressObject(element, this.options.character);
    		else if(this.type == 'submit')
    			this.createSubmitObject(element);
    		else if(jQuery.Array.include(['click','dblclick','mouseover','mouseout','mousemove','mousedown','mouseup','contextmenu'],this.type))
    			this.createMouseObject(element);
    	},
    	simulateEvent : function(element) {
    		if(element.dispatchEvent) {
    			return element.dispatchEvent(this.event);
    		} else if(element.fireEvent) {
    			return element.fireEvent('on'+this.type, this.event);
    		} else
    			throw "Your browser doesn't support dispatching events";
    	},
    	createEvents : function(element) {
            this.event = document.createEvent("Events");
            this.event.initEvent(this.type, true, true ); 
    		this.simulateEvent(element);
    	},
    	createSubmitObject : function(element) {
    		// if using controller
    		if(MVC.Controller) {
    			// look for submit input
    			for(var i=0; i<element.elements.length; i++) {
    				var el = element.elements[i];
    				// if found, click it
    				if(el.nodeName.toLowerCase()=='input' && el.type.toLowerCase() == 'submit')
    					return (new MVC.SyntheticEvent('click').send(el));
    			}
    			// if not, find a text input and click enter
    			// look for submit input
    			for(var i=0; i<element.elements.length; i++) {
    				var el = element.elements[i];
    				// if found, click it
    				if((el.nodeName.toLowerCase()=='input' && el.type.toLowerCase() == 'text') || el.nodeName.toLowerCase() == 'textarea')
    					return (new MVC.SyntheticEvent('keypress', {keyCode: 13}).send(el));
    			}
    		} else {
    			// if not using controller, fire event normally 
    			//   - should trigger event handlers not using event delegation
    	        this.simulateEvent(element);
    		}
    	},
    	createKeypress : function(element, character) {
    		if(character && character.match(/\n/)) {
    			this.options.keyCode = 13;
    			character = 0;
    		}
    		if(character && character.match(/[\b]/)) {
    			this.options.keyCode = 8;
    			character = 0;
    		}
    		var options = jQuery.extend({
    			ctrlKey: false,
    			altKey: false,
    			shiftKey: false,
    			metaKey: false,
    			keyCode: this.options.keyCode || (character? character.charCodeAt(0) : 0),
    			charCode: (character? character.charCodeAt(0) : 0)
    		}, arguments[2] || {});
    		try {
    			this.event = document.createEvent("KeyEvents");
    			this.event.initKeyEvent(this.type, true, true, window, 
    			options.ctrlKey, options.altKey, options.shiftKey, options.metaKey,
    			options.keyCode, options.charCode );
    		} catch(e) {
    			try {
    				this.event = document.createEvent("Events");
    			} catch(e2) {
    				this.event = document.createEvent("UIEvents");
    			} finally {
    				this.event.initEvent(this.type, true, true);
    				jQuery.extend(this.event, options);
    			}
    		}
    		var fire_event = this.simulateEvent(element);
    		if(fire_event && this.type == 'keypress' && !jQuery.browser.mozilla && 
                (element.nodeName.toLowerCase() == 'input' || element.nodeName.toLowerCase() == 'textarea')) {
                    if(character) element.value += character;
                    else if(this.options.keyCode && this.options.keyCode == 8) element.value = element.value.substring(0,element.value.length-1);
            }
    	},
    	createKeypressObject : function(element, character) {
    		if(character && character.match(/\n/)) {
    			this.options.keyCode = 13;
    			character = 0;
    		}
    		if(character && character.match(/[\b]/)) {
                this.options.keyCode = 8;
    			character = 0;
    		}
    		
      		this.event.charCode = (character? character.charCodeAt(0) : 0);
      		this.event.keyCode = this.options.keyCode || (character? character.charCodeAt(0) : 0);
    		var fire_event = this.simulateEvent(element);
    		if(fire_event && this.type == 'keypress' && !jQuery.browser.mozilla && 
                (element.nodeName.toLowerCase() == 'input' || element.nodeName.toLowerCase() == 'textarea')) {
                    if(character) element.value += character;
                    else if(this.options.keyCode && this.options.keyCode == 8) element.value = element.value.substring(0,element.value.length-1);
            }
    	},
        create_mouse_options : function(element){
            var center = jQuery(element).centerv();
            var defaults =jQuery.extend({
    			bubbles : true,
    			cancelable : true,
    			view : window,
    			detail : 1,
    			screenX : 1, screenY : 1,
    			clientX : center[0], clientY : center[1],
    			ctrlKey : false, altKey : false, shiftKey : false, metaKey : false,
    			button : (this.type == 'contextmenu' ? 2 : 1), 
    			relatedTarget : null
    		}, this.options);
            return defaults;
        },
    	createMouse : function(element){
            this.event = document.createEvent('MouseEvents');
    		var defaults = this.create_mouse_options(element)
            
    		this.event.initMouseEvent(this.type, 
    			defaults.bubbles, defaults.cancelable, 
    			defaults.view, 
    			defaults.detail, 
    			defaults.screenX, defaults.screenY,defaults.clientX,defaults.clientY,
    			defaults.ctrlKey,defaults.altKey,defaults.shiftKey,defaults.metaKey,
    			defaults.button,defaults.relatedTarget);
            this.simulateEvent(element);
    	},
    	createMouseObject : function(element){
            jQuery.extend(this.event, this.create_mouse_options(element));
    		
            if(!jQuery.browser.mozilla && 
    			(element.nodeName.toLowerCase() == 'input' || 
    			(element.type && element.type.toLowerCase() == 'checkbox'))) 
    			element.checked = (element.checked ? false : true);
    		this.simulateEvent(element);
    	},
        
        drag: function(target){
    		//get from and to
    		
    		var addxy = function(part, options, center){
    			if(!options[part].x || !options[part].y ){
    				var j = jQuery(options[part])
                    var o = j.offset();
                    
                    options[part] = {
                        x: o.left+ (center ? j.width() / 2 : 0 ),
                        y: o.top + (center ? j.height() / 2 : 0 )
                    };
    			}
    		}
            this.options.from = target;
    		addxy('from', this.options);
    		addxy('to', this.options, true);
    		if(this.options.duration){
    			return new Drag(target, this.options)
    		}
    		var x = this.options.from.x;
    		var y = this.options.from.y;
    		var steps = this.options.steps || 100;
    		this.type = 'mousedown';
    		this.options.clientX = x;
    		this.options.clientY = y;
    		this.create_event(target);
    		this.type = 'mousemove';
    		for(var i = 0; i < steps; i++){
    			x = this.options.from.x + (i * (this.options.to.x - this.options.from.x )) / steps;
    			y = this.options.from.y + (i * (this.options.to.y - this.options.from.y )) / steps;
    			this.options.clientX = x;
    			this.options.clientY = y;
    			this.create_event(target);
    		}
            this.type = 'mouseup';
            this.options.clientX = this.options.to.x;
			this.options.clientY = this.options.to.y ;
            this.create_event(target);
    	}
        
    }


    /**
     * Used for creating and dispatching synthetic events.
     * @codestart
     * new MVC.Synthetic('click').send(MVC.$E('id'))
     * @codeend
     * @init Sets up a synthetic event.
     * @param {String} type type of event, ex: 'click'
     * @param {optional:Object} options
     */
    jQuery.fn.synthetic = function(type, options) {
      return this.each(function(){
        new Synthetic(type, options).send(this);
      });
    };
    
    
    
    
    
    
    
    
var Drag = function(target , options){
    this.callback = options.callback;
	this.start_x = options.from.x;
	this.end_x = options.to.x;
	this.delta_x = this.end_x - this.start_x;
	this.start_y = options.from.y;
	this.end_y = options.to.y;
	this.delta_y = this.end_y - this.start_y;
	this.target = target;
	this.duration = options.duration ? options.duration*1000 : 1000;
	this.start = new Date();
    
	new Synthetic('mousedown', {clientX: this.start_x, clientY: this.start_y}).send(target);
	
	this.pointer = document.createElement('div');
	this.pointer.style.width = '10px';
	this.pointer.style.height = '10px';
	this.pointer.style.backgroundColor = 'RED';
	this.pointer.style.position = 'absolute';
	this.pointer.style.left = ''+this.start_x+'px';
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
    var pointerY = this.start_y+scrollTop;
	this.pointer.style.top = ''+pointerY+'px';
	this.pointer.style.lineHeight = '1px';
	document.body.appendChild(this.pointer);
	setTimeout(this.next_callback(), 20);
};
Drag.prototype = {
	next: function(){
		var now = new Date();
		var difference = now - this.start;
		if( difference > this.duration ){
			new Synthetic('mousemove', {clientX: this.end_x, clientY: this.end_y}).send(this.target);
			var event = new Synthetic('mouseup', {clientX: this.end_x, clientY: this.end_y}).send(this.target);
			this.pointer.parentNode.removeChild(this.pointer);
			if(this.callback) this.callback({event: event, element: this.target});
		}else{
			var percent = difference / this.duration;
			var x =  this.start_x + percent * this.delta_x;
			var y = this.start_y + percent * this.delta_y;
			
			this.pointer.style.left = ''+x+'px';
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
            var pointerY = y+scrollTop;
			this.pointer.style.top = ''+pointerY+'px';
			new Synthetic('mousemove', {clientX: x, clientY: y}).send(this.target);
			setTimeout(this.next_callback(), 20);
		}
	},
	next_callback : function(){
		var t = this;
		return function(){
			t.next();
		};
	}
};
    
    
    
    
    
    
    
    
    
    
    
    
    
}());








