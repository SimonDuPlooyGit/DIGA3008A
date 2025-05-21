const dropDownBut = document.getElementById("dropdownbutton");
const dropDownMenu = document.getElementById("bloglinks");

const toggle = function () {
    dropDownMenu.classList.toggle("show");
}

dropDownBut.addEventListener("click", function (e) {
    e.stopPropagation();
    toggle();
})

document.documentElement.addEventListener("click", function () {
    if (dropDownMenu.classList.contains("show")) {
        toggle();
    }
})