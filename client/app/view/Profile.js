Ext.define('StudentPortal.view.Profile', {
   extend: 'Ext.Panel',
   alias:'widget.profile',
   requires: [
      'Ext.Img'
   ],
   config: {
      cls: 'profile-panel',
      scrollable: {
          direction: 'vertical'
      },
      tpl: '<DIV style="left:0;right:0;margin-right:auto;margin-left:auto; width: calc(100% - 40px);  max-width: 700px">' + '<div class="body-form">'+
              '<div class="profile-pic">'+ 
                '<div class="div-profile-photo" id="divProfilePhoto">  </div>' +
              '</div>' +
              '<div class="table">'+
                 '<div class="row">'+
                    '<span class="cell cell1 separator">'+
                       '<div class="flaticon-user168"></div>'+
                    '</span>'+
                    '<span class="cell cell2 separator">'+
                        '<div class="title-info"> name</div>'+
                        '<div class="box-info">'+
                        '   <div> <b> {name} </b></div>'+
                        '</div>'+
                    '</span>'+
                 '</div>'+              
                 '<div class="row">'+
                    '<span class="cell cell1 separator">'+
                       '<div class="flaticon-key162"></div>'+
                    '</span>'+
                    '<span class="cell cell2 separator">'+
                        '<div class="title-info"> person code </div>'+
                        '<div class="box-info">'+
                        '      <div>{person_code}</div>'+
                        '</div>'+
                    '</span>'+
                 '</div>'+
                 '<div class="row">'+
                    '<span class="cell cell1 separator">'+
                       '<div class="flaticon-graduation-cap2"></div>'+
                    '</span>'+
                    '<span class="cell cell2 separator">'+
                        '<div class="title-info"> course</div>'+
                        '<div class="box-info">'+
                        '   <div>{course_name}</div>'+
                        '</div>'+
                    '</span>'+
                 '</div>'+                 
              '</div>'+
           '</div>' + '</DIV>'
   }
});