/**addEventListener("DOMContentLoaded", (event) => { })
{
    
}*/


let toTopLink = document.querySelector(".ToTop");
let prevScrollPos = window.pageYOffset;

const isScrollingDown = (scrollPos) => {
    return scrollPos > prevScrollPos;
};

const scrolling = () => {
    let viewHeight = window.innerHeight;
    let scrollPos = window.pageYOffset;
    let scrollingDown = isScrollingDown(scrollPos);

    // Debug color change
    document.body.style.backgroundColor = scrollingDown ? "red" : "blue";

    if (scrollingDown) {
        toTopLink.style.bottom = "-30px";
    } else if (!scrollingDown && scrollPos > viewHeight) {
        toTopLink.style.bottom = "15px";
    }

    prevScrollPos = scrollPos; // Update after decision
};

window.addEventListener("scroll", scrolling);
