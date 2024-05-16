// export const search = () => {
//     document.getElementById("search-input").addEventListener("keypress", function(event) {
//         if (event.key === "Enter") {
//             let searchTerm = event.target.value;
//             console.log("Búsqueda realizada:", searchTerm);
//         }
//     });
// }

document.addEventListener('DOMContentLoaded', () => {
    let search_input = document.querySelector("#search-input");
  
    search_input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const query = search_input.value.trim();
        if (query) {
          code = query.replace(" ", "%20");
          albums(code);
        }
      }
    });
});


export const datosJson = async() => {
    try {
        let dato = await (await fetch('../storage/img/album2.json')).json()
        let variable = dato.tracks.items
        izquierda_albums.innerHTML = ""
        for (let i = 0; i < variable.length; i++) {
            let dataUrl = variable[i].data.albumOfTrack.coverArt.sources[0].url;
            let dataUri = variable[i].data.uri;
            let dataName = variable[i].data.name;
            let dataArtista = variable[i].data.artists.items[0].profile.name 

            let etiqueta = document.createElement("div")
            etiqueta.classList.add("contenedor_albums")
            etiqueta.innerHTML = `
                <div class="data_album" data-id="${dataUri}">
                    <div class="imagen_album">
                        <img src="${dataUrl}" alt="" class="portada">
                     </div>
                    <div<div class="info_album">
                        <h3>${dataName}</h3>
                        <p>${dataArtista}</p>
                    </div>
                </div> 
            `
            izquierda_albums.append(etiqueta)
        }
    } catch (error) {
        console.log(error);
    }
}

datosJson()
    
// export const datosJson = async () => {
//     let dato = await (await fetch('../storage/img/album2.json')).json();
//     let val = []
  
//     for (let i = 0; i < 8 && i < dato.albums.items.length; i++) {
//       if (dato.albums.items[i].data && dato.albums.items[i].data.coverArt && dato.albums.items[i].data.coverArt.sources && dato.albums.items[i].data.coverArt.sources.length > 0) {
//         let dataUrl = dato.albums.items[i].data.coverArt.sources[0].url;
//         let dataUri = dato.albums.items[i].data.uri;
//         let dataName = dato.albums.items[i].data.name;
//         let dataId = dataUri.split(':')[2];
//         val.push(dataUrl, dataId, dataName);
//     }
//     return val;
// }
// };
// datosJson()
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