var testing = {
   init: function () {
      var me = this;
      function objectFromQueryString (queryString, recursive) {
         var parts = queryString.replace(/^\?/, '').split('&'), object = {}, temp, components, name, value, i, ln, part, j, subLn, matchedKeys, matchedName, keys, key, nextKey;

         for ( i = 0, ln = parts.length; i < ln; i++) {
            part = parts[i];

            if (part.length > 0) {
               components = part.split('=');
               name = decodeURIComponent(components[0]);
               value = (components[1] !== undefined) ? decodeURIComponent(components[1]) : '';

               if (!recursive) {
                  if (object.hasOwnProperty(name)) {
                     if (!Ext.isArray(object[name])) {
                        object[name] = [object[name]];
                     }

                     object[name].push(value);
                  }
                  else {
                     object[name] = value;
                  }
               }
               else {
                  matchedKeys = name.match(/(\[):?([^\]]*)\]/g);
                  matchedName = name.match(/^([^\[]+)/);

                  //<debug error>
                  if (!matchedName) {
                     Ext.Error.raise({
                        sourceClass: "Ext.Object",
                        sourceMethod: "fromQueryString",
                        queryString: queryString,
                        recursive: recursive,
                        msg: 'Malformed query string given, failed parsing name from "' + part + '"'
                     });
                  }
                  //</debug>

                  name = matchedName[0];
                  keys = [];

                  if (matchedKeys === null) {
                     object[name] = value;
                     continue;
                  }

                  for ( j = 0, subLn = matchedKeys.length; j < subLn; j++) {
                     key = matchedKeys[j];
                     key = (key.length === 2) ? '' : key.substring(1, key.length - 1);
                     keys.push(key);
                  }

                  keys.unshift(name);

                  temp = object;

                  for ( j = 0, subLn = keys.length; j < subLn; j++) {
                     key = keys[j];

                     if (j === subLn - 1) {
                        if (Ext.isArray(temp) && key === '') {
                           temp.push(value);
                        }
                        else {
                           temp[key] = value;
                        }
                     }
                     else {
                        if (temp[key] === undefined || typeof temp[key] === 'string') {
                           nextKey = keys[j + 1];

                           temp[key] = (Ext.isNumeric(nextKey) || nextKey === '') ? [] : {};
                        }

                        temp = temp[key];
                     }
                  }
               }
            }
         }

         return object;
      }


      me.settings = objectFromQueryString(window.location.search);
      /*
       * Set User
       * user=user.name
       */

      if (me.settings.user) {
         document.cookie = 'Uidtoken=' + me.settings.user;
      }
      else {
         document.cookie = 'Uidtoken=camillab';
      }
      /*
       * Set Setup
       * setup=dev/test default = dev
       */
      if (!me.settings.setup) {
         me.settings.setup = 'dev';
      }
      delete me.init;
      testing = me.settings;
   },
   settings: {}
};
testing.init();
