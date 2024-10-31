if (localStorage.getItem("dark-mode-enabled") === "true" ){
    document.body.classList.add("dark-mode");
    const darkModeIcon = document.getElementById("darkModeIcon");
    darkModeIcon.textContent = "light_mode";
}

function toggleDarkMode() {
    const darkModeIcon = document.getElementById("darkModeIcon");
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")){
        darkModeIcon.textContent = "light_mode";
        localStorage.setItem("dark-mode-enabled", "true");
    } else {
        darkModeIcon.textContent = "dark_mode";
        localStorage.setItem("dark-mode-enabled", "false");
    }
}