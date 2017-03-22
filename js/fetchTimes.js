let bookings;
let currentPersonSelected = 0;
const storeName = document.querySelector("#storeName");
const storePersons = document.querySelector("#storePersons");
const personDates = document.querySelector("#personDates");
const storeHours = document.querySelector("#storeHours");
const timeSlotsDuration = 2; //hours

/*
    - hver butikk har x slot's 
    - tidene som kommer i json er bookede slot's
*/
storePersons.addEventListener("change", e => {
    console.log("Selected", e.target.value);
    const currentPerson = parseInt(e.target.value, 10);
    personDates.innerHTML = "";
    const elm = document.createElement("div");
    elm.classList.add("calendar-view");
    for (let i = 0; i < bookings.available_bookings[currentPerson].dates.length; i++) {
        let currentDay = bookings.available_bookings[currentPerson].dates[i];
        const item = document.createElement("div");
        item.classList.add("calendar-view-item");
        const header = document.createElement("h3");
        header.classList.add("h3");
        header.innerHTML = currentDay.date;
        elm.appendChild(item);
        item.appendChild(header);
        console.log("times", currentDay.times.length);
        for (let j = 0; j < currentDay.times.length; j++) {
            const btn = document.createElement("button");
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

const onJsonFinished = () => {
    console.log("bookings", bookings.warehouse);
    const head = document.createElement("h3");
    head.classList.add("h2");
    head.innerHTML = bookings.warehouse;
    storeName.appendChild(head);
    for (let i = 0; i < bookings.available_bookings.length; i++) {
        const opt = document.createElement("option");
        opt.value = i;
        opt.text = bookings.available_bookings[i].person;
        storePersons.appendChild(opt);
        //console.log("Person", bookings.available_bookings[i].person);
        //console.log("dates", bookings.available_bookings[i].dates);
    }
    const elm = document.createElement("div");
    elm.classList.add("calendar-view");
    for (let j = 0; j < bookings.opening_hours.length; j++) {
        const day = document.createElement("div");
        day.classList.add("calendar-view-item");
        const header = document.createElement("h3");
        header.innerHTML = bookings.opening_hours[j].day;
        header.classList.add("h3");
        day.appendChild(header);
        const hours = document.createElement("div");
        hours.innerHTML = bookings.opening_hours[j].start + ".00 - " + bookings.opening_hours[j].end+".00";       
        day.appendChild(hours);
        elm.appendChild(day);
    }
    storeHours.appendChild(elm);
}

if (self.fetch) {
    fetch('../data/calendar_kitchen_lillestrom.json')
        .then(response => {
            console.log("response", response);
            return response.json();
        }).then(json => {
            console.log("parse json", json);
            bookings = json;
            onJsonFinished();
        }).catch(err => {
            console.log("error", err);
        });
} else {
    storeName.innerHTML = "Klarte ikke å hente data - gammel nettleser";
}
