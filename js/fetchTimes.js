let bookings;
let currentPersonSelected = 0;
const storeName = document.querySelector("#storeName");
const storePersons = document.querySelector("#storePersons");
const personDates = document.querySelector("#personDates");

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
            let id = "elm"+i+"-"+j;
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
            item.appendChild(ul);
        }
    }
    personDates.appendChild(elm);
});

/*

*/

const onJsonFinished = () => {
    console.log("bookings", bookings.warehouse);
    storeName.innerHTML = bookings.warehouse;
    for (let i = 0; i < bookings.available_bookings.length; i++) {
        const opt = document.createElement("option");
        opt.value = i;
        opt.text = bookings.available_bookings[i].person;
        storePersons.appendChild(opt);
        //console.log("Person", bookings.available_bookings[i].person);
        //console.log("dates", bookings.available_bookings[i].dates);
    }
}

fetch('../data/calendar_kitchen_lillestrom.json')
    .then(response => {
        return response.json();
    }).then(json => {
        console.log("parse json", json);
        bookings = json;
        onJsonFinished();
    }).catch(err => {
        console.log("error", err);
    });

