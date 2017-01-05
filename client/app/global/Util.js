Ext.define('StudentPortal.global.Util', {
   singleton: true,

   timeToDateAmPm: function(dt, hour) {

      dt.setHours(0, 0, 0);

      var timeFull = hour.split(" ");
      hm = timeFull[0].split(":");

      var timeHour = parseInt(hm[0], 10),
         timeMin = parseInt(hm[1], 10);

      if (timeFull[1].toUpperCase() == "PM") {
         timeHour = timeHour + 12;
      }

      if ((timeFull[1].toUpperCase() == "AM") && (timeHour == 12)) {
         timeHour = 0;
      }

      var timeDt = dt;
      timeDt.setHours(timeHour, timeMin);

      return timeDt;
   },

   timeToDate: function(dt, hour) {

      var timeFull, hm, timeHour, timeMin;

      dt.setHours(0, 0, 0);

      // AM/PM
      if (hour.length > 5) {

         timeFull = hour.split(" ");
         hm = timeFull[0].split(":");

         timeHour = parseInt(hm[0], 10),
         timeMin = parseInt(hm[1], 10);

         if (timeFull[1].toUpperCase() == "PM") {
            timeHour = timeHour + 12;
         }

         if ((timeFull[1].toUpperCase() == "AM") && (timeHour == 12)) {
            timeHour = 0;
         }
      }
      // 24-hour
      else {
         hm = hour.split(":");

         timeHour = parseInt(hm[0], 10),
         timeMin = parseInt(hm[1], 10);
      }

      var timeDt = dt;
      timeDt.setHours(timeHour, timeMin);

      return timeDt;
   },

   addZeroInTime: function(i) {
      if (i < 10) {
         i = "0" + i;
      }
      return i;
   },

   getTimeFromDate: function(d) {
      var me = this,
         h = me.addZeroInTime(d.getHours()),
         m = me.addZeroInTime(d.getMinutes());
      return h + ":" + m;
   },

   getTimeFromDateString: function(d) {
      if (d.indexOf(':') > 0) {
         var dateTime = d.split(' ');
         return dateTime[1];
      }
      return '';
   },

   dateToTimeAmPm: function(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
   },

   isoDateString: function(d) {
      function pad(n) {
         return n < 10 ? '0' + n : n
      }
      return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + 'T' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) + 'Z'
   },

   getUserCookie: function(name) {
      var i, x, y, ARRcookies = document.cookie.split(";");

      for (i = 0; i < ARRcookies.length; i++) {
         x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
         y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
         x = x.replace(/^\s+|\s+$/g, "");
         if (x == name) {
            return unescape(y);
         }
      }
   },

   setUserCookie: function(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
   },

   deleteCookie: function(name) {
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
   },

   deleteAllCookies: function() {
      var cookies = document.cookie.split(";");

      for (var i = 0; i < cookies.length; i++) {
         var cookie = cookies[i];
         var eqPos = cookie.indexOf("=");
         var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
         document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
   },

   formatDateTime: function(d) {
      var dateFormated;

      try {
         var day = d.getDate();
         var month = d.getMonth() + 1;
         var hour = this.dateToTimeAmPm(d);
         var year = d.getFullYear();
         dateFormated = day + '/' + month + '/' + year + ' - ' + hour;

      } catch (e) {
         dateFormated = '';
      }

      return dateFormated;
   },
   getZuluDateTimeString: function(date) {
      var dateFormated;
      try {
         var zuluDate = Ext.Date.add(date, Ext.Date.MINUTE, new Date().getTimezoneOffset());
         dateFormated = Ext.Date.format(zuluDate, StudentPortal.global.Setting.getDefaultDateFormat());

      } catch (e) {
         dateFormated = '';
      }

      return dateFormated;

   },

   getParameter: function(par) {
      var _params = {};
      var urlString = location.href;

      urlString.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(match, key, value) {
         _params[key] = value;
      });

      this.param = function(paramName) {
         return _params[paramName];
      };

      return this.param(par);
   },

   loadPhotoBinaryToBase64: function(url, user, callBack) {


      var xmlHTTP;

      if (window.XMLHttpRequest) {
         xmlHTTP = new XMLHttpRequest();
      } else {
         xmlHTTP = new ActiveXObject("Microsoft.XMLHTTP");
      }

      xmlHTTP.onload = function() {
         if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {

            var content = this.response;

            var uarr = new Uint8Array(content);
            var strings = [],
               chunksize = 0xffff;
            var len = uarr.length;

            // There is a maximum stack size. We cannot call String.fromCharCode with as many arguments as we want
            for (var i = 0; i * chunksize < len; i++) {
               strings.push(String.fromCharCode.apply(null, uarr.subarray(i * chunksize, (i + 1) * chunksize)));
            }

            var b64 = btoa(strings.join(''));
            var dataURL = "data:image/jpeg;base64," + b64;

            img = document.createElement('img');
            img.src = dataURL;

            callBack.call(this, img);
         } else {
            callBack.call(this, null);
         }
      }


      xmlHTTP.open('GET', url, true); // 'false' makes the request synchronous
      xmlHTTP.setRequestHeader('Uidtoken', user);
      xmlHTTP.responseType = 'arraybuffer';
      xmlHTTP.send();
   }

});