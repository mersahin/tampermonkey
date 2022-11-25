// ==UserScript==
// @name         Timeline for Log My Time
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       @mersahin
// @match        https://*.logmytime.de/Erfassen
// @icon         https://www.google.com/s2/favicons?domain=logmytime.de
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  //$('#AddNewTimeEntryButton').parent().append('<input id="timeline" class="label-rightaligned-input" type="button" value="Timeline">')

  // $("body").on("click", () =>{
  //   if(!$('#timeline').length)
  // });

  const refresh = function() {
    $(".kamil").remove()
    let times = $(".TimeEntriesListStartEnde").toArray().map(x=> $(x).text().trim().replace(/^(Start|Ende)[:]/gi, "").trim()).sort()
    times.length % 2 && times.push(moment().format("HH:mm"))
    let times2 = times.map(x => moment(x, "hh:mm"))
    let total = times2[times2.length-1].diff(times2[0], "minutes")
    times2.map((t, i) => (times2[i+1]?.diff(t, "minutes")* 88 )/ total).forEach(
      (x,i) =>
      {
        if(x)
          $(".content-box").append(`
            <div class="kamil" style='border:solid 1px; width:${x<1?1:Math.round(x)}%;color:white; background:${i%2?'red':'green'}; display: inline-block; '>
            ${Math.round(total*(x/88))<60?Math.round(total*(x/88)):Math.floor(Math.round(total*(x/88))/60) + ':' + (Math.round(total*(x/88))% 60<10?'0':'') + Math.round(total*(x/88))% 60}
            </div>`)
      }
    )
  }

  $('#TimeEntriesList').on('DOMSubtreeModified', function(){
    refresh()
  });

  //setInterval(() => {  },1000)
  //$('body').on("click", '#timeline', refresh());


  //})
  //$("body").click()
})();
