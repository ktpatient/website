const darkModeToggle = document.getElementById("darkModeToggle");

if (localStorage.getItem("dark-mode-enabled") === "true" ){
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "Disable Dark Mode";
}

darkModeToggle.addEventListener("click", ()=>{
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        darkModeToggle.textContent = "Disable Dark Mode";
        localStorage.setItem("dark-mode-enabled", "true");
    } else {
        darkModeToggle.textContent = "Enable Dark Mode";
        localStorage.setItem("dark-mode-enabled", "false");
    }
});