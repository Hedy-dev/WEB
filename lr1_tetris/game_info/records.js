function generateTable() {
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    let playersList = getPlayers();
    for (player in playersList) {
        const row = document.createElement("tr");
        console.log(playersList[player]);
        for (p in playersList[player]) {
            const cell = document.createElement("td");
            //console.log();
            const cellText = document.createTextNode(playersList[player][p]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    document.body.appendChild(tbl);
    tbl.setAttribute("border", "2");
}
function getPlayers() {
    console.log(JSON.parse(localStorage.getItem("listPlayer")));
    return JSON.parse(localStorage.getItem("list_player"));
}

generateTable();