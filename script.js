import works from './data/data.js';
let themeBtn = document.querySelector(".bx-sun")
let menuBtn = document.querySelector(".bx-menu");
let closeMenu = document.querySelector(".bx-x");
let menu = document.querySelector(".menu")
let body = document.body;
let worksBox = document.querySelector(".works");
let menuLink = document.querySelectorAll(".menuLink")

// addClass script
function addClass(b,e,c){
    b.addEventListener('click',() =>{
        e.classList.toggle('active');   
        c.classList.toggle('bxs-moon');   
    })
}
addClass(menuBtn,menu)
addClass(closeMenu,menu)
addClass(themeBtn,body)
addClass(themeBtn,themeBtn,themeBtn)
menuLink.forEach((link) =>{
    addClass(link,menu)
})
// addClass script

// backToTopScript 
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
// backToTopScript 
// increment script 

// increment script 







// script to push works data 

works.forEach((work) => {
    let selfItem = document.createElement("a");
    selfItem.classList.add("work");
    selfItem.setAttribute("href",`${work.link}`)
    selfItem.setAttribute("target","_blank");
    selfItem.setAttribute("rel",`noopener noreferrer`);
    selfItem.setAttribute("data-aos",`fade-up`);
    selfItem.innerHTML = `
        <img src=${work.img}  width="200" alt=${work.title}>
        <div class="work-desc">
             <h3>${work.title} <i class='bx bx-link-external'></i></h3>
            <p>
                ${work.desc}
            </p>
        </div>
    `
    worksBox.append(selfItem)
})
// script to push works data 