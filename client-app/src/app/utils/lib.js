 export default class Lib {

     static reloadWithoutQuery() {
         window.location.href = window.location.href.replace(window.location.search, "")
     }

     static renderFullPlace(place) {
         let placeParts = [];
         let tPlace = place;
         while (tPlace) {
             placeParts.push(tPlace.placeName);
             tPlace = tPlace.parentPlace;
         }
         return placeParts.join(", ");
     }
     static formatCurrency(price) {
         var formatter = new Intl.NumberFormat('vn-VN', {
             style: 'currency',
             currency: 'VND',
         });

         return formatter.format(price);
     }
     static formatDate(date) {
         const dateObj = new Date(date);
         return `${dateObj.getHours().toString().padStart(2,"0")}h${dateObj.getMinutes().toString().padStart(2,"0")} ${dateObj.toDateString()}`
     }
     static getNextDate(date, hours) {
         const nextDateObj = new Date(date);
         nextDateObj.setHours(nextDateObj.getHours() + hours);
         return nextDateObj;
     }

     static serializeToQuery(data) {
         var str = [];
         for (var p in data)
             if (data.hasOwnProperty(p)) {
                 str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
             }
         return str.join("&");
     }


     static serializeISODateWithTimezone(datetime, timezone = 7) {
         const rs = new Date(datetime);
         rs.setHours(datetime.getHours() + timezone);
         return rs.toISOString();
     }

     static compareTwoDates(date1, date2) {
         const date1Temp = new Date(date1);
         const date2Temp = new Date(date2);
         date1Temp.setHours(0, 0, 0, 0);
         date2Temp.setHours(0, 0, 0, 0);
         return date1Temp > date2Temp ? 1 : (date1Temp < date2Temp ? -1 : 0);
     }

     static validateEmail(email) {
         const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return re.test(String(email).toLowerCase());
     }

     static navigateWithQuery(url) {
         window.location.href = url + window.location.search;
     }

     static getParameterByName = (name, url = window.location.href) => {
         name = name.replace(/[\[\]]/g, '\\$&');
         var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
             results = regex.exec(url);
         if (!results) return null;
         if (!results[2]) return '';
         return decodeURIComponent(results[2].replace(/\+/g, ' '));
     }
 }