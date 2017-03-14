(function() {
    const chooseBtnArr = document.getElementsByClassName("btn-choose-trailer");
    const dayArr = document.getElementsByName("something");
    const btnSubmit = document.querySelector("#btnSubmit");
    
    let trailer, time;

    const showHideElm = (elm, state) => {
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

    for (let i = 0; i < chooseBtnArr.length; i++) {
        chooseBtnArr[i].addEventListener("click", e => {
            console.log("e", e.target.value);
            trailer = e.target.value;
        });
    }

    for (let j = 0; j < dayArr.length; j++) {
        dayArr[j].addEventListener("click", e => {
            console.log("radio", e.target.value);
            time = e.target.value;
        });
    }

    btnSubmit.addEventListener("click", e => {
       console.log("submit", trailer, time);
    });
}());