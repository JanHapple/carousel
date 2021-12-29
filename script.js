const slider = document.querySelector(".slider");

// Nodelist of all carousel elements
const slides = document.querySelectorAll("section");
// transform Nodelist into an Array
let slidesArr = [...slides]

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let direction = 0;
let percentage = 0;

// add functionality to next button
next.addEventListener("click", () => {
    // if next button is clicked first
    if (direction === 0) {
        slider.style.transform = `translate(${percentage-=40}%)`
        
        direction = 1;
    // change direction from previous (move left) to next (move right)
    } else if (direction === -1) {
        slider.style.transform = `translate(${percentage-=40}%)`
        
        direction = 1;
    } else {
        slider.style.transform = `translate(${percentage}%)`
    }    
})

// flexible variant
prev.addEventListener("click", () => {
    // if previous button is clicked first 
    if (direction === 0) {
        direction = -1;
    
        slider.style.transform = `translate(${percentage}%)`    
    // change direction from next (move right) to previous (move left)
    } else if (direction === 1) {
        direction = -1;

        slider.style.transform = `translate(${percentage+=40}%)`
    } else {
        slider.style.transform = `translate(${percentage}%)`
    }
    
})

slider.addEventListener("transitionend", () => {
    // functionality after clicking next
    if (direction === 1) {
        // take the first element of Nodelist-Array
        const firstSlide = slidesArr[0];

        // clone the first element of the Nodelist-Array and append it to the end of the slider
        const cloneFirstSlide = firstSlide.cloneNode(true);
        slider.appendChild(cloneFirstSlide);
        // remove the first element of the slider
        const element = slider.getElementsByTagName("section");
        slider.removeChild(element[0]);

        // track the movement of the slider elements with Nodelist-Array
        const newArr = slidesArr.concat(slidesArr[0]).slice(1,6)
        slidesArr = newArr

        // Bring slider back into the correct position
        slider.style.transition = "none"
        slider.style.transform = "translate(-20%)"
        setTimeout(() => {
            slider.style.transition = "ease-out .5s"
        })
    } else {
        // functionality after clicking previous

        // take the last element of Nodelist-Array
        const lastSlide = slidesArr[slides.length - 1];

        // clone the last element of the Nodelist-Array and insert in front of all elements of the slider
        const cloneLastSlide = lastSlide.cloneNode(true);
        slider.prepend(cloneLastSlide);
        // now remove the last element of the slider
        const element = slider.getElementsByTagName("section");
        slider.removeChild(element[5]);

        // track the movement of the slider elements with Nodelist-Array
        const nodeElement = slidesArr[4];
        slidesArr.unshift(nodeElement)
        const newArr = slidesArr.slice(0,5);
        slidesArr = newArr

        // Bring slider back into the correct position
        slider.style.transition = "none"
        slider.style.transform = "translate(-20%)"
        setTimeout(() => {
            slider.style.transition = "ease-out .5s"
        })
    }
})