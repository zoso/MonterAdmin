"use strict";

(function () {
    var chooseBtnArr = document.getElementsByClassName("btn-choose-trailer");
    var dayArr = document.getElementsByName("something");
    var btnSubmit = document.querySelector("#btnSubmit");

    var trailer = void 0,
        time = void 0;

    var showHideElm = function showHideElm(elm, state) {
        if (state) {
            if (elm.contains("hidden")) {
                elm.classList.remove("hidden");
                elm.classList.add("expand-out");
            }
        } else {
            elm.classList.add("hidden");
            if (elm.classList.contains("expand-out")) {
                elm.classList.remove("expand-out");
            }
        }
    };

    for (var i = 0; i < chooseBtnArr.length; i++) {
        chooseBtnArr[i].addEventListener("click", function (e) {
            console.log("e", e.target.value);
            trailer = e.target.value;
        });
    }

    for (var j = 0; j < dayArr.length; j++) {
        dayArr[j].addEventListener("click", function (e) {
            console.log("radio", e.target.value);
            time = e.target.value;
        });
    }

    btnSubmit.addEventListener("click", function (e) {
        console.log("submit", trailer, time);
    });
})();