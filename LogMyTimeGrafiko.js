// ==UserScript==
// @name         LMT grafiko
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://pso.logmytime.de/Erfassen
// @icon         https://www.google.com/s2/favicons?domain=logmytime.de
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const allHours = document.querySelectorAll(".TimeEntriesListStartEnde");
    const pauseHours = document.getElementById("pausehours");
    const tagesArbeitszeit = document.querySelectorAll(
        ".dev_Animatable.StandardCursor"
    )[0];
    const daily = document.createElement("div");
    const arbeitHours = document.createElement("div");
    const chartBox = document.createElement("div");
    const canvas = document.createElement("canvas");

    const body = document.querySelector("body");
    body.prepend(daily);
    chartBox.appendChild(canvas);
    daily.appendChild(chartBox);
    daily.appendChild(arbeitHours);
    //style
    chartBox.style.cssText = `
width: 14rem;
margin: auto;
margin-bottom:1rem;
display:none`;

    daily.style.cssText = `
  background-color: rgb(233, 245, 245);
  border-radius: 2rem;
  padding: 1rem;
  width: 90%;
  margin: auto;
  margin-top: 1rem;
`;

    arbeitHours.style.cssText = `
  display: flex;
  max-width: 100%;
  margin: auto;
  cursor:pointer;
  `;
    const start = [...allHours]
    .filter((item) => item.innerText.includes("Start"))
    .map((item) => item.innerText.slice(7, 12));
    const ende = [...allHours]
    .filter((item) => item.innerText.includes("Ende"))
    .map((item) => item.innerText.slice(6, 12));
    const total2 = start.concat(ende).sort();
    const firstHour =
          total2[0].split(":")[0] * 60 + parseFloat(total2[0].split(":")[1]);
    const lastHour =
          total2[total2.length - 1].split(":")[0] * 60 +
          parseFloat(total2[total2.length - 1].split(":")[1]);

    const totalZeit = lastHour - firstHour;

    const dauertTotal =
          tagesArbeitszeit.innerText.split(":")[0] * 60 +
          parseFloat(tagesArbeitszeit.innerText.split(":")[1]);

    const pause = totalZeit - dauertTotal;
    const toFindDuplicates = (arr) =>
    arr.filter((item, index) => arr.indexOf(item) !== index);
    const duplicateElement = toFindDuplicates(total2);
    const filterArr = total2
    .filter((item) => !duplicateElement.includes(item))
    .map((item) => item.split(":")[0] * 60 + parseFloat(item.split(":")[1]));

    console.log(filterArr);

    for (let index = 0; index < filterArr.length; index++) {
        const timeLine = document.createElement("div");
        timeLine.style.cssText = `
  background-color: rgb(73, 243, 73);
  height: 1rem;


  width:${filterArr[index + 1] - filterArr[index] - 1}rem
`;
        index % 2 && (timeLine.style.backgroundColor = "rgb(248, 54, 54)");
        arbeitHours.append(timeLine);
    }
    let hide = true;
    arbeitHours.addEventListener("click", () => {
        hide = !hide;
        return hide
            ? (chartBox.style.display = "none")
        : (chartBox.style.display = "block");
    });
    //Data Block
    const data = {
        labels: ["Pause Minutes", "Work Minutes"],
        datasets: [
            {
                label: "# of Votes",
                data: [pause, dauertTotal],
                backgroundColor: ["rgb(248, 54, 54)", "rgb(73, 243, 73)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
            },
        ],
    };
    //Config Block
    const config = {
        type: "pie",
        data,
        options: {},
    };
    //Render Block
    const myChart = new Chart(canvas, config);})();
