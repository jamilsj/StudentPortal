Ext.define('StudentPortal.controller.Profile', {
   extend: 'Ext.app.Controller',
   requires: [
      'StudentPortal.store.Profile'   
   ],
   config: {
       refs: {
         profile: 'profile'
       }
   },

   init: function() {
      var me = this;
      me.control({
         profile: {
            initialize: 'doIniProfile'
         }
      })
   },

   doIniProfile: function(){
      var me = this;
      me.getProfile().setMasked({
         xtype: 'loadmask',
         message: 'Loading...'
      });   

      Ext.create('StudentPortal.store.Profile', {
         listeners: {
            scope: me,
            load: me.onProfileLoad
         }
      }).load();
   },
   getProportionalSize: function(x, y, minRef){
      var greater;
      var lesser;

      if (x == y){
         return minRef;
      }

      if (x > y){
         greater = x;
         lesser = y;
      }
      else {
         greater = y;
         lesser = x;
      }

      return (minRef * greater) / lesser;

   },
   onProfileLoad: function(me, records, successful, operation, eOpts) {
      var me = this,img,photo,defaultPhoto;      

      if (!records[0]) {
         Ext.defer( function() {
            Ext.Msg.alert('ERROR','No record was loaded',Ext.emptyFn);
            me.getProfile().setMasked(false);
            Ext.Viewport.getActiveItem().destroy();
         }, 10 );
         return;
      }

      StudentPortal.global.Util.setUserCookie('pcode', records[0].get('person_code'), 1);

      defaultPhoto = Ext.create('Ext.Img', {
         src: '//'+tdsGlobal.getDirContext() + '/resources/images/defaultPhoto.png',
         height: 200,
         width: 135          
      });   

      // Photo Profile
      var url = '/' + StudentPortal.global.Setting.getDeployContext() + '/photo',
         user = StudentPortal.global.Setting.getUser(),
         callBack = function(img) {

            if ((img) && (img.height > 0)){
               var minRef = 200;
               var height = minRef;
               var width = minRef;

               if(img.height > img.width){
                  var newHeight = me.getProportionalSize(img.width, img.height, minRef);
                  var marginTop = ((newHeight - 200) / 2) * -1;
                  img.className = 'img-profile-photo-vertical';
                  img.style = 'margin-top:'+marginTop+'px;'+'width:'+width+'px;'+'height:'+newHeight+'px;';
               }
               else {

                  if (img.height == img.width) {
                     img.className = 'img-profile-photo-square';
                  }
                  else {
                     img.className = 'img-profile-photo-horizontal'; 
                  }
                  
                  var newWidth = me.getProportionalSize(img.width, img.height, minRef);
                  var marginLeft = ((newWidth - 200) / 2) * -1;
                  img.style = 'margin-left:'+marginLeft+'px;'+'width:'+newWidth+'px;'+'height:'+height+'px;';
               }
               
               me.updateForm(img, records[0]);
            }
            else {
               defaultPhoto.imageObject.className = 'img-profile-photo-default';
               me.updateForm(defaultPhoto.imageObject, records[0]);
            }         
         }

      StudentPortal.global.Util.loadPhotoBinaryToBase64(url, user, callBack);

   },

   updateForm: function(img, rec){
      var me = this;
      me.getProfile().setRecord(rec);
      Ext.get('divProfilePhoto').appendChild(img);
      me.getProfile().setMasked(false);
   }

});
