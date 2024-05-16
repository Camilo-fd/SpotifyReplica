// document.addEventListener('DOMContentLoaded', () => {
//     let search_input = document.querySelector("#search-input");
  
//     search_input.addEventListener('keydown', (event) => {
//       if (event.key === 'Enter') {
//         const query = search_input.value.trim();
//         if (query) {
//           code = query.replace(" ", "%20");
//           albums(code);
//         }
//       }
//     });
// });

// let code = "%20";
// document.addEventListener('DOMContentLoaded', () => {
//     albums(code);
// });


// export const albums = async(valor) => {
//     const url = `https://spotify23.p.rapidapi.com/search/?q=${valor}&type=albums&offset=0&limit=10&numberOfTopResults=5`;
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '2fbdf41833msh18ff7c8d94f130bp1126eejsndb31ef662eac',
//             'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
//         }
//     };
    
//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         let variable = result.albums.items
//         izquierda_albums.innerHTML = ""
//         for (let i = 0; i < variable.length; i++) {
//             let dataUrl = variable[i].data.coverArt.sources[0].url;
//             let dataUri = variable[i].data.uri;
//             let dataName = variable[i].data.name;
//             let dataArtista = variable[i].data.artists.items[0].profile.name 

//             let etiqueta = document.createElement("div")
//             etiqueta.classList.add("contenedor_albums")
//             etiqueta.innerHTML = `
//                 <div class="data_album" data-id="${dataUri}">
//                     <div class="imagen_album">
//                         <img src="${dataUrl}" alt="" class="portada">
//                      </div>
//                     <div<div class="info_album">
//                         <h3>${dataName}</h3>
//                         <p>${dataArtista}</p>
//                     </div>
//                 </div> 
//             `
//             izquierda_albums.append(etiqueta)
//             // etiqueta.querySelector("data_album").addEventListener("click", () =>{
//             //     let frame = document.querySelector("my-frame");
//             //     frame.setAttribute("uri", uri);
//             // })
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }

// albums()



