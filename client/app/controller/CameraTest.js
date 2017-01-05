Ext.define('StudentPortal.controller.CameraTest', {
   extend: 'Ext.app.Controller',
   config: {
      refs: {
         cameratest: 'cameratest'
      }
   },

   init: function() {
      var me = this;
      me.control({
         cameratest: {
            initialize: 'doIniCamera'
         }
      })
   },
   doIniCamera: function(){
      // this.html = '<video id="video" width="640" height="480" autoplay></video>';
      document.getElementById('video-container').innerHTML = '<video id="video" width="640" height="480" autoplay></video>';
      // debugger;
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
