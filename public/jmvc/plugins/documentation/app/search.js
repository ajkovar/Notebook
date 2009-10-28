$.Model.extend('Search',
{
    find: function(val){
        var level = 3;
        var val = val.toLowerCase();
        
        if(!val) val="home"; // return the core stuff
        
        if(val == "favorites")
            return this.getFavorites();
        
        var current = _searchData;
        for(var i =0; i < level; i++){
            if(val.length <= i || !current) break;
            var letter = val.substring(i, i+1);
            current = current[letter];
        }
        var list = [];
        if(current && val.length > level){
            //make sure everything in current is ok
            for(var i =0; i < current.list.length; i++){
                if(current.list[i].tag.toLowerCase().indexOf(val) > -1 ) 
                    list.push(current.list[i])
            }
        }else if(current){
            list = current.list;
        }
		return this.wrapMany(list.sort(this.sortFn));
    },
    sortFn :  function(a, b){
		//if equal, then prototype, prototype properties go first
        var aname = (a.title? a.title : a.name).replace(".prototype",".000AAAprototype").replace(".static",".111BBBstatic");
		var bname = (b.title? b.title : b.name).replace(".prototype",".000AAAprototype").replace(".static",".111BBBstatic");
		 
		
		if(aname < bname) 
			return -1
		else aname > bname
			return 1
		return 0;
	},
    sortJustStrings : function(aname, bname){
        var aname = aname.replace(".prototype",".000AAAprototype").replace(".static",".111BBBstatic");
		var bname = bname.replace(".prototype",".000AAAprototype").replace(".static",".111BBBstatic");
		 
		
		if(aname < bname) 
			return -1
		else aname > bname
			return 1
		return 0;
    }
},
{}
)