document.getElementById("search-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        var searchTerm = event.target.value;
        console.log("Búsqueda realizada:", searchTerm);
    }
});