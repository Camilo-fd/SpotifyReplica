document.addEventListener('DOMContentLoaded', () => {
    let search_input = document.querySelector("#search-input");
  
    search_input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const query = search_input.value.trim();
        if (query) {
          code = query.replace(" ", "%20");
          albums(code);
        //   cancion(code)
        }
      }
    });
});

let code = "%20";
document.addEventListener('DOMContentLoaded', () => {
    albums(code);
});

// -----------------------------------------------------------------------------

class myframe extends HTMLElement{
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
                <iframe class="spotify-iframe" width="100%" height="670" src="https://open.spotify.com/embed/${typeOf}/${id}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
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
customElements.define("my-frame",myframe)


// const cancion = async (valor) => {
//     const url = `https://spotify23.p.rapidapi.com/search/?q=${valor}&type=albums&offset=0&limit=10&numberOfTopResults=5`;
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '806062533fmsh3bc74c884ecb12dp1fd2a6jsnf85e5ef161be',
//             'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
//         }
//     };
    
//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         let variable = result.albums.items
//         // const myFrameElement = document.querySelector('my-frame');

//         for (let i = 0; i < 1 && i < variable.length; i++) {
//         const uri = variable[i].data.uri;
        
//         // myFrameElement.setAttribute('uri', uri);
//         // await new Promise(resolve => setTimeout(resolve, 10000));
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };

// cancion()

// -----------------------------------------------------------------------------

export const albums = async(valor) => {
    const url = `https://spotify23.p.rapidapi.com/search/?q=${valor}&type=albums&offset=0&limit=10&numberOfTopResults=5`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '806062533fmsh3bc74c884ecb12dp1fd2a6jsnf85e5ef161be',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        let variable = result.albums.items
        izquierda_albums.innerHTML = ""
        for (let i = 0; i < variable.length; i++) {
            let dataUrl = variable[i].data.coverArt.sources[0].url;
            let dataUri = variable[i].data.uri;
            let dataName = variable[i].data.name;
            let dataArtista = variable[i].data.artists.items[0].profile.name 
            let uri = variable[i].data.uri.split(":")[2]

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
        console.error(error);
    }
}

albums()



