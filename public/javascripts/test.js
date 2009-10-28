submitNote = function(){
	$.getJSON("home/saveNote?note[id]=1&note[user_id]=1&note[content]=hehe", function(json){
	});
	$.getJSON("home/retrieveNotes?note[id]=1&note[user_id]=1&note[content]=hehe", function(json){
	});

};

init = function(){
	$("#submitButton").click(submitNote);
};

$(document).ready(init);
