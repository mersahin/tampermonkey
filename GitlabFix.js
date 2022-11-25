// ==UserScript==
// @name         Gitlab fix
// @version      0.1
// @description  try to take over the world!
// @author       @mersahin
// @match        https://gitlab/*
// @grant       GM_notification
// ==/UserScript==

function GM_addStyle (cssStr) {
    var D               = document;
    var newNode         = D.createElement ('style');
    newNode.textContent = cssStr;

    var targ    = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (newNode);
}
// GM_notification({
//     title:"Willkommen",
//     text:"Herzlich",
//     image:"https://i.stack.imgur.com/geLPT.png"
// })

GM_addStyle ( `
 .mini-pipeline-graph-dropdown-menu {
  width: 340px;
  max-width: 340px;
}
` );
