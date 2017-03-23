let bookings;
let currentPersonSelected = 0;
const storeName = document.querySelector("#storeName");
const storePersons = document.querySelector("#storePersons");
const personDates = document.querySelector("#personDates");
const storeHours = document.querySelector("#storeHours");
const timeSlotsDuration = 2; //hours
const timeSlot = document.querySelector("#timeSlot");

/*
    - hver butikk har x slot's 
    - tidene som kommer i json er bookede slot's
*/

const selectSlot = e => {
    console.log("Selected", e);
    const currentPerson = parseInt(e, 10);
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
        for (let j = 0; j < currentDay.times.length; j++) {
            const outer = document.createElement("div");
            outer.classList.add("radio-group");
            const label = document.createElement("label");
            const radio = document.createElement("input");
            const span = document.createElement("span");
            const id = "elm"+i+"-"+j;
            radio.type = "radio";
            radio.id = id;
            label.htmlFor = id;
            label.classList.add("slots-select")
            span.innerHTML = currentDay.times[j];
            radio.name = "booking_times";
            radio.classList.add("slots-radio");
            radio.value = currentDay.times[j];
            radio.setAttribute("data-date", currentDay.date);
            label.appendChild(radio);
            label.appendChild(span);
            item.appendChild(label); 
        }
    }
    personDates.appendChild(elm);
    const btns = document.getElementsByClassName("slots-radio");
    console.log(">> ", btns.length);
    for (let k = 0; k < btns.length; k++) {
        btns[k].addEventListener("click", e => {
            btns[k].classList.add("selected");
            console.log("btn", e.target.value, e.target.dataset.date);
        })
        
    }
};

storePersons.addEventListener("change", e => {
    selectSlot(e.target.value);
});

const onJsonFinished = () => {
    timeSlot.innerHTML = bookings.time_slot;
    const head = document.createElement("h3");
    head.classList.add("h2");
    head.innerHTML = bookings.warehouse;
    storeName.appendChild(head);
    for (let i = 0; i < bookings.available_bookings.length; i++) {
        const opt = document.createElement("option");
        opt.value = i;
        opt.text = bookings.available_bookings[i].person;
        storePersons.appendChild(opt);
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
    selectSlot(0);
}

if (self.fetch) {
    fetch('../data/calendar_kitchen_lillestrom.json')
        .then(response => {
            return response.json();
        }).then(json => {
            bookings = json;
            onJsonFinished();
        }).catch(err => {
            console.log("error", err);
        });
} else {
    storeName.innerHTML = "Klarte ikke å hente data - gammel nettleser";
}
