"use strict";

var bookings = void 0;
var currentPersonSelected = 0;
var storeName = document.querySelector("#storeName");
var storePersons = document.querySelector("#storePersons");
var personDates = document.querySelector("#personDates");
var storeHours = document.querySelector("#storeHours");
var timeSlotsDuration = 2; //hours

/*
    - hver butikk har x slot's 
    - tidene som kommer i json er bookede slot's
*/
storePersons.addEventListener("change", function (e) {
    console.log("Selected", e.target.value);
    var currentPerson = parseInt(e.target.value, 10);
    personDates.innerHTML = "";
    var elm = document.createElement("div");
    elm.classList.add("calendar-view");
    for (var i = 0; i < bookings.available_bookings[currentPerson].dates.length; i++) {
        var currentDay = bookings.available_bookings[currentPerson].dates[i];
        var item = document.createElement("div");
        item.classList.add("calendar-view-item");
        var header = document.createElement("h3");
        header.classList.add("h3");
        header.innerHTML = currentDay.date;
        elm.appendChild(item);
        item.appendChild(header);
        console.log("times", currentDay.times.length);
        for (var j = 0; j < currentDay.times.length; j++) {
            var btn = document.createElement("button");
            btn.classList.add("btn", "btn-default", "btn-block");
            btn.value = currentDay.times[j];
            btn.innerHTML = currentDay.times[j];
            item.appendChild(btn);
            /*let id = "elm"+i+"-"+j;
            const ul = document.createElement("ul");
            const li = document.createElement("li");
            const label = document.createElement("label");
            label.htmlFor = id;
            label.innerHTML = currentDay.times[j];
            const radio = document.createElement("input");
            radio.id = id;
            radio.type = "radio";
            radio.name = "availeble_time";
            radio.value = currentDay.times[j];
            li.appendChild(radio);
            li.appendChild(label);
            ul.appendChild(li);
            item.appendChild(ul);*/
        }
    }
    personDates.appendChild(elm);
});

var onJsonFinished = function onJsonFinished() {
    console.log("bookings", bookings.warehouse);
    var head = document.createElement("h3");
    head.classList.add("h2");
    head.innerHTML = bookings.warehouse;
    storeName.appendChild(head);
    for (var i = 0; i < bookings.available_bookings.length; i++) {
        var opt = document.createElement("option");
        opt.value = i;
        opt.text = bookings.available_bookings[i].person;
        storePersons.appendChild(opt);
        //console.log("Person", bookings.available_bookings[i].person);
        //console.log("dates", bookings.available_bookings[i].dates);
    }
    var elm = document.createElement("div");
    elm.classList.add("calendar-view");
    for (var j = 0; j < bookings.opening_hours.length; j++) {
        var day = document.createElement("div");
        day.classList.add("calendar-view-item");
        var header = document.createElement("h3");
        header.innerHTML = bookings.opening_hours[j].day;
        header.classList.add("h3");
        day.appendChild(header);
        var hours = document.createElement("div");
        hours.innerHTML = bookings.opening_hours[j].start + ".00 - " + bookings.opening_hours[j].end + ".00";
        day.appendChild(hours);
        elm.appendChild(day);
    }
    storeHours.appendChild(elm);
};

if (self.fetch) {
    fetch('../data/calendar_kitchen_lillestrom.json').then(function (response) {
        console.log("response", response);
        return response.json();
    }).then(function (json) {
        console.log("parse json", json);
        bookings = json;
        onJsonFinished();
    }).catch(function (err) {
        console.log("error", err);
    });
} else {
    storeName.innerHTML = "Klarte ikke å hente data - gammel nettleser";
}