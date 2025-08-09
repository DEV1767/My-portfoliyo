const pbutton=document.querySelector("p")
const slidebar=document.querySelector(".sidebar .sid-nav") 
pbutton.addEventListener("click",function(){
    slidebar.style.display="flex"
})
const cross=document.querySelector("#s1")
const slidebar2=document.querySelector(".sid-nav")
cross.addEventListener("click",function(){
      slidebar2.style.display="none"
})
[document.body.querySelectorAll('*')].forEach(el => {
  if (el.scrollWidth > el.clientWidth) {
    el.style.border = '2px solid red';
  }
});

/*const section=document.querySelector()
 window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-bar a");

  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${section.id}`) {
          link.classList.add("active");
        }
      });
    }
  });
});*/


 