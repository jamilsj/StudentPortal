Ext.define('StudentPortal.view.CameraTest', {
   extend: 'Ext.Panel',
   alias: 'widget.cameratest',
   // html: '<div id="video-container"></div>',
   // html: '<video id="video" width="640" height="480" autoplay></video>',
   config: {
      fullscreen: true,
      activeItem: 0, 
      items: [{
         xtype: 'panel',
         id: 'video-container'
      }]
   }
});