Ext.define('StudentPortal.controller.CameraTest', {
   extend: 'Ext.app.Controller',
   config: {
      refs: {
         cameraTest: 'cameraTest'
      }
   },

   init: function() {
      var me = this;
      me.control({
         cameraTest: {
            initialize: 'doIniCamera'
         }
      })
   },
   doIniCamera: function(){
      debugger;
      navigator.getUserMedia = navigator.getUserMedia ||
         navigator.webkitGetUserMedia ||
         navigator.mozGetUserMedia;

      if (navigator.getUserMedia) {
         navigator.getUserMedia(
            { 
               audio: true, 
               video: { width: 1280, height: 720}
            },
            function(stream) {
               var video = document.querySelector('video');
               video.src = window.URL.createObjectURL(stream);
               video.onloadedmetadata = function(e) {
                 video.play();
               };
               console.log("YAYYYY");
            },
            function(err) {
               console.log("The following error occurred: " + err.name);
            }
         );
      } else {
         console.log("getUserMedia not supported");
      }
   }   
});
