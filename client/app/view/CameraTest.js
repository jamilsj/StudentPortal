Ext.define('StudentPortal.view.CameraTest', {
   extend: 'Ext.Panel',
   alias: 'widget.cameratest',
   requires:[
      'StudentPortal.view.MyAbsencesList',
      'StudentPortal.form.MyAbsencesForm'
   ],
   html: '<video id="video" width="640" height="480" autoplay></video>',
   config: {
      fullscreen: true,
      activeItem: 0
   }, 
   initialize:function(){
      var constraints = {video: true }; 

//       var camera = {};
//       navigator.mediaDevices.enumerateDevices().then(function(devices) {
//          devices.forEach(function(device) {

//          });
//       }).catch(function(err) {
//         console.log(err.name + ": " + err.message);
//       });

//       var constraints = {video: {
//          facingMode: {exact: "user"},
//          width: {exact: 640},
//          height: {exact: 480}
//       }};

//       navigator.getMedia = (navigator.getUserMedia ||
//          navigator.webkitGetUserMedia ||
//          navigator.mozGetUserMedia ||
//          navigator.msGetUserMedia);
// debugger;
      if(navigator.mediaDevices && navigator.getUserMedia) {
         navigator.getUserMedia(constraints, (function(mediaStream) {
            var video = document.querySelector('video');
            video.srcObject = mediaStream;
            video.onloadedmetadata = function(e) {
               video.play();
            };
         }),function(err) { 
            console.log(err.name + ": " + err.message); 
         }); // always check for errors at the end.

      } else{
         console.error('Camera couldn\'t be started')
      }
      // navigator.getMedia({
      //       audio: false,
      //       video: {
      //          optional: [{
      //             sourceId: camera[user]
      //          }]
      //       }
      //    },
      //    function(stream) {
      //       if (navigator.mozGetUserMedia) {
      //          video.mozSrcObject = stream;
      //          frame.mozSrcObject = stream;
      //       } else {
      //          var vendorURL = window.URL || window.webkitURL;
      //          video.src = vendorURL.createObjectURL(stream);
      //          frame.src = vendorURL.createObjectURL(stream);
      //       }
      //       localStream = stream;
      //       video.play();
      //       frame.play();
      //    },
      //    function(err) {
      //       console.log("An error occured! " , err);
      //    }
      // );
   }
});