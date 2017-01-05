Ext.define('StudentPortal.global.Setting', {
   singleton: true,
   alternateClassName: 'tdsGlobal',
   config: {
      deployContext: ((window.location.pathname.split('/')[1] === 'i') ? 'apex' : window.location.pathname.split('/')[1]),
      dirContext: (window.location.host + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'))),
      absenceFromMonthsBefore: 6,
      attendanceFromMonthsBefore: 12,
      swipeLogFromDaysBefore: 7,
      fileSizeAllowed: 10485760, //10.00 MB
      extenalContent: 'lib/help.html',
      defaultDateFormat: 'd/m/Y H:i',
      debugMode: true,
      user: ''
   },
   constructor: function (config) {
      this.initConfig(config);

      return this;
   },
   getText: function(text) {
      switch (text) {
         case 'invalidParameter':
            return 'Invalid Search Parameter';
            
         case 'toBeforeFrom':
            return 'Your to date must be later than your from date.';

         default:
            return 'Text not found: ' + text;
      }
   }
});


