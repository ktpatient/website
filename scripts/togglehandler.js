const toggle = document.getElementById('toggleAnimation');
const title = document.getElementById("title");
const container = title.parentElement;
const colorChangeChars = document.querySelectorAll(".colorChangeChar");
let int = 0;
colorChangeChars.forEach((char, index) => {
    char.style.animationDelay = `${index * 0.2}s`;
    int ++;
});
title.style.animationDelay = `${int * 0.1}s`; 

toggle.addEventListener('change', () => {
  container.classList.toggle('animate', toggle.checked);
});