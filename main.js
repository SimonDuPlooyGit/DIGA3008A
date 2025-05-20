let toTopLink = document.querySelector(".ToTop");
let prevScrollPos = 0;

const isScrollingDown = () => {
    let scrollingDown = false;
    let scrollPos = window.pageYOffset;

    if (scrollPos > prevScrollPos) {
        scrollingDown = true;
    }

    prevScrollPos = scrollPos;

    return scrollingDown
}

const scrolling = () => {
    let viewHeight = window.innerHeight;
    let scrollPos = window.pageYOffset;

    if (isScrollingDown()) {
        toTopLink.style.visibility = "hidden";
    } else if (isScrollingDown() === false && scrollPos > viewHeight) {
        toTopLink.style.visibility = "visible";
    }
}

window.addEventListener("scroll", scrolling);