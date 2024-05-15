export const search = () => {
    document.getElementById("search-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            let searchTerm = event.target.value;
            console.log("Búsqueda realizada:", searchTerm);
        }
    });
}

export const datosJson = async() => {
    let dato = await (await fetch('../storage/img/album2.json')).json()
    for (let i = 0; i < dato.albums.items.length; i++) {
        if (dato.albums.items[i].data && dato.albums.items[i].data.coverArt && dato.albums.items[i].data.coverArt.sources && dato.albums.items[i].data.coverArt.sources.length > 0) {
            let dataUrl = dato.albums.items[i].data.coverArt.sources[0].url;
            let dataUri = dato.albums.items[i].data.uri;
            let dataId = dataUri.split(':')[2];

            return [dataUrl, dataId]
        }
    }
}

// console.log(await datosJson());






// console.log(await datosJson());
// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': '2fbdf41833msh18ff7c8d94f130bp1126eejsndb31ef662eac',
//     'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
//   }
// };

// try {
//   const response = await fetch(url, options);
//   const result = await response.json();
//   for (let i = 0; i < result.albums.items.length; i++) {
//     console.log(result.albums.items[i].uri);
//   }
// } catch (error) {
//   console.error(error);
// }   