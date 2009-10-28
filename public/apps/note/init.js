include.resources();
include.engines();
include.plugins(
    'controller','view','model'/*,'controller/dragdrop'*/
    );

include(function(){ //runs after prior includes are loaded
  include.models('note','tag');
  include.controllers('note_container','sidebar','tag', 'note', 'note_tag', 'trash');
  //include.views('note/test');
});
