// ==UserScript==
// @name         jira fix
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://jira/secure/RapidBoard.jspa*
// @icon         https://www.google.com/s2/favicons?domain=undefined.jira
// @grant        none
// ==/UserScript==

function GM_addStyle (cssStr) {
    var D               = document;
    var newNode         = D.createElement ('style');
    newNode.textContent = cssStr;

    var targ    = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (newNode);
}

GM_addStyle ( `
.ghx-band-1 .ghx-issue-fields .ghx-summary .ghx-inner,
.ghx-issue-fields .ghx-summary .ghx-inner{
max-height: fit-content;
}
` );
