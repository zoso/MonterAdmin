"use strict";

var bookings = void 0;
var currentPersonSelected = 0;
var storeName = document.querySelector("#storeName");
var storePersons = document.querySelector("#storePersons");
var personDates = document.querySelector("#personDates");
var storeHours = document.querySelector("#storeHours");
var timeSlotsDuration = 2; //hours
var timeSlot = document.querySelector("#timeSlot");

/*
    - hver butikk har x slot's 
    - tidene som kommer i json er bookede slot's
*/

var selectSlot = function selectSlot(e) {
    console.log("Selected", e);
    var currentPerson = parseInt(e, 10);
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
        //console.log("times", currentDay.times.length);
        for (var j = 0; j < currentDay.times.length; j++) {
            var outer = document.createElement("div");
            outer.classList.add("radio-group");
            var label = document.createElement("label");
            var radio = document.createElement("input");
            var span = document.createElement("span");
            var id = "elm" + i + "-" + j;
            radio.type = "radio";
            radio.id = id;
            label.htmlFor = id;
            label.classList.add("slots-select");
            span.innerHTML = currentDay.times[j];
            radio.name = "booking_times";
            radio.classList.add("slots-radio");
            radio.value = currentDay.times[j];
            radio.setAttribute("data-date", currentDay.date);
            label.appendChild(radio);
            label.appendChild(span);
            item.appendChild(label);
            /*const btn = document.createElement("button");
            btn.classList.add("btn", "btn-default", "btn-select");
            btn.value = currentDay.times[j];
            btn.setAttribute("data-date", currentDay.date);
            btn.innerHTML = currentDay.times[j];
            item.appendChild(btn);*/
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
    var btns = document.getElementsByClassName("slots-radio");
    console.log(">> ", btns.length);

    var _loop = function _loop(k) {
        btns[k].addEventListener("click", function (e) {
            btns[k].classList.add("selected");
            console.log("btn", e.target.value, e.target.dataset.date);
        });
    };

    for (var k = 0; k < btns.length; k++) {
        _loop(k);
    }
};

storePersons.addEventListener("change", function (e) {
    selectSlot(e.target.value);
});

var onJsonFinished = function onJsonFinished() {
    //console.log("bookings", bookings.warehouse);
    timeSlot.innerHTML = bookings.time_slot;
    var head = document.createElement("h3");
    head.classList.add("h2");
    head.innerHTML = bookings.warehouse;
    storeName.appendChild(head);
    for (var i = 0; i < bookings.available_bookings.length; i++) {
        var opt = document.createElement("option");
        opt.value = i;
        opt.text = bookings.available_bookings[i].person;
        storePersons.appendChild(opt);
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
    selectSlot(0);
};

if (self.fetch) {
    fetch('../data/calendar_kitchen_lillestrom.json').then(function (response) {
        return response.json();
    }).then(function (json) {
        bookings = json;
        onJsonFinished();
    }).catch(function (err) {
        console.log("error", err);
    });
} else {
    storeName.innerHTML = "Klarte ikke å hente data - gammel nettleser";
}