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

document.addEventListener('DOMContentLoaded', () => {
    let search_input = document.querySelector("#search-input-derecha");

    search_input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const query = search_input.value.trim();
        if (query) {
            code = query.replace(" ", "%20");
            listarCancion(code)
        }
    }
    });
});

let code = "blessd";
document.addEventListener('DOMContentLoaded', () => {
    albums(code);
    listarCancion(code)
});

let codigo = "ak 47";
document.addEventListener('DOMContentLoaded', () => {
    listarCancion(codigo)
});

// -----------------------------------------------------------------------------

class myFrame extends HTMLElement {
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
            if (typeOf == "album" && window.innerWidth <= 800) {
                this.shadowRoot.innerHTML = `
                    <iframe class="spotify-iframe" width="100%" height="550" src="https://open.spotify.com/embed/${typeOf}/${id}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                `;
                // 550
            } else {
                this.shadowRoot.innerHTML = `
                    <iframe class="spotify-iframe" width="100%" height="450" src="https://open.spotify.com/embed/${typeOf}/${id}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                `;
            }
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
customElements.define("my-frame", myFrame);


export const albums = async (valor) => {
    const url = `https://spotify23.p.rapidapi.com/search/?q=${valor}&type=albums&offset=0&limit=10&numberOfTopResults=5`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4b1d6eee2emsh35c2f0964cc33c9p14f03ejsnc5693afebfb4 ',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const variable = result.albums.items;
        const izquierda_albums = document.getElementById('izquierda_albums');
        izquierda_albums.innerHTML = "";
        for (let i = 0; i < variable.length; i++) {
            const dataUrl = variable[i].data.coverArt.sources[0].url;
            const dataUri = variable[i].data.uri;
            const dataName = variable[i].data.name;
            const dataArtista = variable[i].data.artists.items[0].profile.name;
            const uri = variable[i].data.uri.split(":")[2];

            const etiqueta = document.createElement("div");
            etiqueta.classList.add("contenedor_albums");
            etiqueta.innerHTML = `
                <div class="data_album" data-id="${dataUri}">
                    <div class="imagen_album">
                        <img src="${dataUrl}" alt="" class="portada">
                        <div class="overlay">
                            <div class="info_album">
                                <h3>${dataName}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            izquierda_albums.append(etiqueta);
            
            etiqueta.querySelector('.data_album').addEventListener('mouseover', () => {
                etiqueta.querySelector('.overlay').style.opacity = '1';
            });
            
            etiqueta.querySelector('.data_album').addEventListener('mouseout', () => {
                etiqueta.querySelector('.overlay').style.opacity = '0';
            });
            etiqueta.querySelector('.data_album').addEventListener('click', async () => {
                const frame = document.querySelector("#section_middleFrame");
                frame.setAttribute("uri", `spotify:album:${uri}`);
                await cancion(uri);
            });
        }
    } catch (error) {
        console.error(error);
    }
}

// -----------------------------------------------------------------------------

const cancion = async (albumId) => {
    const url = `https://spotify23.p.rapidapi.com/albums/?ids=${albumId}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4b1d6eee2emsh35c2f0964cc33c9p14f03ejsnc5693afebfb4 ',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const variable = result.albums[0].tracks.items; 
        const dataImage = result.albums[0].images[0].url;
        const derecha_canciones = document.getElementById('derecha_canciones');
        derecha_canciones.innerHTML = "";
        for (let i = 0; i < variable.length; i++) {
            const dataUri = variable[i].uri;
            const dataURL = variable[i].external_urls.spotify; 
            const dataName = variable[i].name;
            const dataArtista = variable[i].artists[0].name
            const uri = dataUri.split(":")[2]

            const etiqueta = document.createElement("div");
            etiqueta.classList.add("contenedor_canciones");
            etiqueta.innerHTML = `
                <div class="data_canciones" cancion-id="${dataUri}">
                    <div class="imagen_cancion">
                        <img src="${dataImage}" alt="" class="cancion">
                    </div>
                    <div class="info_cancion">
                        <p>${dataName}</p>
                        <h3>${dataArtista}</h3>
                    </div>
                </div>
            `;
            derecha_canciones.append(etiqueta);
            etiqueta.querySelector('.data_canciones').addEventListener('click', async () => {
                const frame = document.querySelector("#section_middleFrame");
                frame.setAttribute("uri", `spotify:track:${uri}`);
            });
        }
    } catch (error) {
        console.error(error);
    }
};

// -----------------------------------------------------------------------------

const listarCancion = async (cancionId) => {
    const url = `https://spotify23.p.rapidapi.com/search/?q=${cancionId}&type=tracks&offset=0&limit=10&numberOfTopResults=5`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4b1d6eee2emsh35c2f0964cc33c9p14f03ejsnc5693afebfb4 ',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const variable = result.tracks.items;
        const derecha_canciones = document.getElementById("derecha_canciones")
        derecha_canciones.innerHTML = "";
        for (let i = 0; i < variable.length; i++) {
            const dataUri = variable[i].data.uri;
            const uri = dataUri.split(":")[2]
            const dataId = variable[i].data.id;
            const dataCancion = variable[i].data.name
            const dataName = variable[i].data.albumOfTrack.name;
            const dataImage = variable[i].data.albumOfTrack.coverArt.sources[0].url;
            const dataArtista = variable[i].data.artists.items[0].profile.name;

            const etiqueta = document.createElement("div");
            etiqueta.classList.add("contenedor_canciones");
            etiqueta.innerHTML = `
                <div class="data_canciones" cancion-id="${dataId}">
                    <div class="imagen_cancion">
                        <img src="${dataImage}" alt="" class="cancion">
                    </div>
                    <div class="info_cancion">
                        <p>${dataCancion}</p>
                        <h3>${dataArtista}</h3>
                    </div>
                    <img src="storage/musica.gif">
                </div>
            `;
            derecha_canciones.append(etiqueta);
            etiqueta.querySelector('.data_canciones').addEventListener('click', async () => {
                const frame = document.querySelector("#section_middleFrame");
                frame.setAttribute("uri", `spotify:track:${uri}`);
            });
        }
    } catch (error) {
        console.log(error);
    }     
}

// listarCancion()
cancion()