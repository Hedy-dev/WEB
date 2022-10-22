function login(event) {
    let name = document.getElementById("name").value;
    localStorage.setItem("last_player", name);
}

document.getElementById("name").value = localStorage.getItem("last_player");
document.getElementById("player").addEventListener("submit", login);