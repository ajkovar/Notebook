$.Model.extend("Note",
{
    findAll : function(params,success){
       // $.get("/tasks.json", params, this.callback(["wrapMany",success]),"json");
	$.getJSON("home/retrieveNotes?note[id]=1&note[user_id]=1&note[content]=hehe", this.callback(["wrapMany",success]));
    }
},
{
    save : function(success){
        $.get("/task_complete", {id: this.id }, success,"json");
    }
})
