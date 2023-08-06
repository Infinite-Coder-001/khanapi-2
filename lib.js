function KhanAPI() {
  /** All in one API for Khan Academy */

  
  function getHotlist(callback) {
    /** Getting top 100 programs of hotlist */
    function tryGettingHotlistData(delay) {
      /** Trying to fetch the file */
      var timeoutVariable; 
      
      function timeout(delay) {
        tryGettingHotlistData(delay + 1); 
      }
      function finished() {
        clearTimeout(timeoutVariable); 
        callback(getHotlistData());
      }

      var script = document.createElement('script');
      var date = new Date(Date.now() - 1000 * 60 * delay);
      var year = date.getUTCFullYear();
      var month = date.getUTCMonth();
      var day = date.getUTCDate();
      var hours = date.getUTCHours();
      var minutes = date.getUTCMinutes();

      if (String(month).split("").length === 1) {
        month = "0" + String(parseInt(month) + 1);
      }
      if (String(day).split("").length === 1) {
        day = "0" + day;
      }
      if (String(hours).split("").length === 1) {
        hours = "0" + hours;
      }
      if (String(minutes).split("").length === 1) {
        minutes = "0" + minutes;
      }

      script.src = "https://cdn.jsdelivr.net/gh/Infinite-Coder-001/khanapi-2@main/data/hotlist-" + year + month + day + hours + minutes + ".js";
      script.onload = function() {
        finished();
      };

      document.head.appendChild(script); 
      if (delay < 10) {
        timeoutVariable = setTimeout(function() {
          timeout(delay);
        }, 1000);
      }
    }
    tryGettingHotlistData(0); 
  }


  return {getHotlist}; 
}
