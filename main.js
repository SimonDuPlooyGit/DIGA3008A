let toTopLink = document.querySelector(".ToTop");
let prevScrollPos = window.pageYOffset;

const isScrollingDown = (scrollPos) => {
    return scrollPos > prevScrollPos;
};

const scrolling = () => {
    let viewHeight = window.innerHeight;
    let scrollPos = window.pageYOffset;
    let scrollingDown = isScrollingDown(scrollPos);

    document.body.style.backgroundColor = scrollingDown ? "red" : "blue";

    if (scrollingDown) {
        toTopLink.style.bottom = "-100px";
    } else if (!scrollingDown && scrollPos > viewHeight) {
        toTopLink.style.bottom = "15px";
    }

    prevScrollPos = scrollPos;
};

window.addEventListener("scroll", scrolling);
