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

// --------------------------------------------------------------------------------

class MyFrame extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.typeOf = null;
      this.id = null;
    }
  
    connectedCallback() {
      this.renderFrame();
    }
  
    renderFrame() {
      this.shadowRoot.innerHTML = `
      <iframe class="spotify-iframe" width="500" height="450" src="https://open.spotify.com/embed/${this.typeOf}/${this.id}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      `;
    }
  
    static get observedAttributes() {
      return ["uri"];
    }
  
    attributeChangedCallback(name, oldVal, newVal) {
      if (name === 'uri' && oldVal !== newVal) {
        const [, typeOf, id] = newVal.split(':');
        this.typeOf = typeOf;
        this.id = id;
        this.renderFrame();
      }
    }
  }
  
customElements.define("my-frame", MyFrame);
  
const datosCancion = async () => {
    try {
        const dato = await (await fetch('../storage/img/album2.json')).json();
        const variable = dato.tracks.items;
        const myFrameElement = document.querySelector('my-frame');

        for (let i = 0;i < 9 &&  i < variable.length; i++) {
        const uri = variable[i].data.uri;
        myFrameElement.setAttribute('uri', uri);
        // await new Promise(resolve => setTimeout(resolve, 10000));
        }
    } catch (error) {
        console.log(error);
    }
};

datosCancion()