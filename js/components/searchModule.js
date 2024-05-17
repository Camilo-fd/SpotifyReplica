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

// --------------------------------------------------------------------------------

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
            etiqueta.querySelector('.data_album').addEventListener('click', () => {
              const frame = document.querySelector("#section_middleFrame");
              frame.setAttribute("uri", `spotify:album:${uri}`);
          });
        }
    } catch (error) {
        console.log(error);
    }
}

datosJson()

// --------------------------------------------------------------------------------

class myCard extends HTMLElement{
  constructor() {
      super();
      this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
      this.renderFrame();
  }

  renderFrame() {
      const uri = this.getAttribute('uri');
      if (uri) {
          const id = uri.split(':')[2];
          const typeOf = uri.split(':')[1];
          this.shadowRoot.innerHTML = `
              <iframe class="spotify-iframe" width="450" height="200" src="https://open.spotify.com/embed/${typeOf}/${id}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          `;
      } else {
          this.shadowRoot.innerHTML = '';
      }
  }

  static get observedAttributes() {
      return ["uri"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
      if (name === 'uri' && oldVal !== newVal) {
          this.renderFrame();
      }
  }
}
customElements.define("my-card",myCard)