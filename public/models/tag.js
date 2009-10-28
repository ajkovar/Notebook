$.Model.extend("Tag",
{
    findAll : function(params,success){
       // $.get("/tasks.json", params, this.callback(["wrapMany",success]),"json");
	$.getJSON("home/retrieveTags", this.callback(["wrapMany",success]));
	//$.getJSON("home/saveNote?note[id]=9&note[user_id]=2", this.callback(["wrapMany",success]));
    }
},
{
    save : function(success){
        $.get("/task_complete", {id: this.id }, success,"json");
    }
})
