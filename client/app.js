/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/
Ext.application({
   name: 'StudentPortal',
   requires: [
      'Ext.MessageBox',
      'StudentPortal.global.Setting',
      'StudentPortal.global.Util',
      'OpenCharts.OpenCharts'
   ],

   controllers: [
      'Main', 'Profile', 'SwipeLog', 'MyAttendance', 'MyAbsences','RegisterAttendance'
   ],

   views: [
      'Main'
   ],

   stores: [],

   icon: {
      '57': 'resources/icons/Icon.png',
      '72': 'resources/icons/Icon~ipad.png',
      '114': 'resources/icons/Icon@2x.png',
      '144': 'resources/icons/Icon~ipad@2x.png'
   },

   isIconPrecomposed: true,

   antiCSRFToken: null,

   startupImage: {
      '320x460': 'resources/startup/320x460.jpg',
      '640x920': 'resources/startup/640x920.png',
      '768x1004': 'resources/startup/768x1004.png',
      '748x1024': 'resources/startup/748x1024.png',
      '1536x2008': 'resources/startup/1536x2008.png',
      '1496x2048': 'resources/startup/1496x2048.png'
   },

   launch: function() {
      var me = this;

      var userHeader = 'Uidtoken';

      // Destroy the #appLoadingIndicator element
      Ext.fly('appLoadingIndicator').destroy();

      //Google Chrome update v43+ Issue
      this.fixOverflowChangedIssue();

      me.initAntiCSRF(userHeader);

      if (me.antiCSRFToken == null) {

         Ext.defer( function() {
            Ext.Msg.alert('ERROR','No user logeed',Ext.emptyFn);
         }, 10 );

         return;   
      }

      var defaultHeaders = Ext.Ajax.getDefaultHeaders() || {};
      defaultHeaders[userHeader]  = me.antiCSRFToken;
      Ext.Ajax.setDefaultHeaders(defaultHeaders);

      StudentPortal.global.Setting.setUser(me.antiCSRFToken);

      // Initialize the main view
      Ext.Viewport.add(Ext.create('StudentPortal.view.Main'));     
     
   },

   onUpdated: function() {
      Ext.Msg.confirm(
         "Application Update",
         "This application has just successfully been updated to the latest version. Reload now?",
         function(buttonId) {
            if (buttonId === 'yes') {
               window.location.reload();
            }
         }
      );
   },

   fixOverflowChangedIssue: function() {
      if (Ext.browser.is.WebKit) {
         console.info(this.$className + ': Fix a Sencha Touch Bug (TOUCH-5716 / Scrolling Issues in Google Chrome v43+)');

         Ext.override(Ext.util.SizeMonitor, {
            constructor: function(config) {
               var namespace = Ext.util.sizemonitor;

               if (Ext.browser.is.Firefox) {
                  return new namespace.OverflowChange(config);
               } else if (Ext.browser.is.WebKit) {
                  if (!Ext.browser.is.Silk && Ext.browser.engineVersion.gtEq('535') && !Ext.browser.engineVersion.ltEq('537.36')) {
                     return new namespace.OverflowChange(config);
                  } else {
                     return new namespace.Scroll(config);
                  }
               } else if (Ext.browser.is.IE11) {
                  return new namespace.Scroll(config);
               } else {
                  return new namespace.Scroll(config);
               }
            }
         });

         Ext.override(Ext.util.PaintMonitor, {
            constructor: function(config) {
               if (Ext.browser.is.Firefox || (Ext.browser.is.WebKit && Ext.browser.engineVersion.gtEq('536') && !Ext.browser.engineVersion.ltEq('537.36') && !Ext.os.is.Blackberry)) {
                  return new Ext.util.paintmonitor.OverflowChange(config);
               } else {
                  return new Ext.util.paintmonitor.CssAnimation(config);
               }
            }
         });
      }
   },

   initAntiCSRF: function(userHeader) {
      var me = this, antiCSRFCookie = StudentPortal.global.Util.getUserCookie(userHeader); 
      
      localStorage.removeItem(userHeader);

      if (antiCSRFCookie && antiCSRFCookie.length > 0){
         me.antiCSRFToken = antiCSRFCookie;
         localStorage.setItem(userHeader, me.antiCSRFToken);
      } 
      else {
         me.antiCSRFToken = localStorage.getItem(userHeader);
      }
      StudentPortal.global.Util.deleteCookie(userHeader);
   }

});
