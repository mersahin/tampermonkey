// ==UserScript==
// @name         libertex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       @mersahin
// @match        https://app.libertex.com/*
// @icon         https://app.libertex.com/desktop/images/mobile_favicons/favicon.ico
// @grant        none
// ==/UserScript==
function waitForElm(selector, jQuery=false) {
    return new Promise(resolve => {
        if (jQuery) {
            if ($(selector)) {
                return resolve($(selector));
            }

            const observer = new MutationObserver(mutations => {
                if ($(selector)) {
                    resolve($(selector));
                    observer.disconnect();
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        } else {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }


    });
}
// function Sleep(milliseconds) {
//     return new Promise(resolve => setTimeout(resolve, milliseconds));
// }
function Sleep (t) { return new Promise(s => setTimeout(s, t))};

async function signal () {
    let signals = $('.products-list .row').has('.with-signal')
    // return new Promise(resolve => {
    signals.each(async function() {
        let name = $(this).find('.alias').text();
        console.log(name)
        if(name == "BTCUSD") {
            $(this).click()
            waitForElm(`.instrument-name .symbol:contains("${name}")`, true).then(async function() {
                if ($('.exist-investments .instrument-alias').text().indexOf(name) != 0)
                    $("a.new-invest").click()
                else {
                    console.log('Zaten aktif', name)
                    return
                }
                waitForElm('.ui-dialog-content #sumInv').then(async function() {
                    $('#sumInv').val(20)
                    $('#sumInv').change()
                    if (!$('#haslimitTP').is(':visible')) {
                        $('.limit-link').click()
                    }
                    if (!$('#haslimitTP').is(':checked')) {
                        $('#haslimitTP').click()
                        $('#limitTP').val(1)
                        $('#limitTP').change()
                    }
                    if (!$('#haslimitSL').is(':checked')) {
                        $('#haslimitSL').click()
                        $('#limitSL').val(1)
                        $('#limitSL').change()
                    }
                    if ($('.exist-investments .instrument-alias').text().indexOf(name) == 0) {
                        console.log('Zaten aktif', name)
                        return
                    } else {
                        console.log(name, ' Baslatiliyor...')
                        $('#region-modal-right-panel .growth').click()
                        $('#region-modal-right-panel .a-submit')[0].click()
                        waitForElm('.a-invest-close').then(async function() {
                            $('.a-invest-close').click()
                        })
                    }
                })
            })

        }
        else {

        }
    })
    // })
}
function l (msg) {
    console.log('### ',msg)
}
let lastAktion = new Date();
function tick() {
    lastAktion = new Date();
}
function elapsed() {
    let endTime = new Date();
    let timeDiff = endTime - lastAktion; //in ms
    // strip the ms
    timeDiff /= 1000;

    // get seconds
    let seconds = Math.round(timeDiff);
    console.log(seconds + " seconds");
    return seconds;
}
(async function() {
    'use strict';
    const start = async function() {
        console.clear()
        l('=> LOAD')
        await Sleep(5000)
        await check()
        setInterval(function(){
            if (elapsed() > 60)
                location.reload()
        }, 10000)
        // location.reload(),
    }
    start()
    // if(window.attachEvent) {
    //     window.attachEvent('onload', start);
    // } else {
    //     if(window.onload) {
    //         var curronload = window.onload;
    //         var newonload = function(evt) {
    //             curronload(evt);
    //             start(evt);
    //         };
    //         window.onload = newonload;
    //     } else {
    //         window.onload = start;
    //     }
    // }
    const check = async function() {
        l('check')
        waitForElm('[name="zeroFee"]').then(async function() {
            await Sleep(3000)
            $('[name="zeroFee"]').parent().click()
            l('crypto menu')
            waitForElm('.products-list .row').then(async function() {
                await Sleep(3000)
                let signals = $('.products-list .row').has('.with-signal');

                if (signals.length == 0) {
                    l('signal yok')
                    await Sleep(3000);
                } else{
                    l('signal isleniyor', signals.length)
                }
                signal().then(await check());
            })
        })

    }

    })();
