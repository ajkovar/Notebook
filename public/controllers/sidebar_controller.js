/**
 * @tag controllers, home
 */
jQuery.Controller.extend('SidebarController',
/* @Static */
{

},
/* @Prototype */
{
    ready : function(){
		Tag.findAll({}, this.callback('list'));
    },
    list: function(tags){
		this.render({
			html: this.element,
			data: {
				tags: tags
			}
		});
		$(".tag").tag_controller();
		$("#trash").trash_controller();
	}

});
$("#tagList").sidebar_controller();
