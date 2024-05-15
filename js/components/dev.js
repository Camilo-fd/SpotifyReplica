import {datosJson} from "./searchModule.js"
class myAlbum extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    
    async connectedCallback() {
        try {
            let data = await datosJson();
            let url = data[0];
            let id = data[1];
            let name = data[2];
            let templates = `
              <div class="my__album">
                <h1>${name}</h1>
                <img  src="${url}" alt="" data-album-id="${id}">
              </div>
            `;
            this.shadowRoot.innerHTML = templates;
          } catch (error) {
            console.error(error);
          }
    }
}
customElements.define("my-album", myAlbum);


// this.querySelectorAll('img').forEach(img => {
//     img.addEventListener('click', () => {
//         const id = img.dataset.id;
//         const myCard = document.querySelector('.main__frame');
//         // Actualizar el atributo 'uri' con el nuevo ID
//         myCard.setAttribute('uri', `spotify:album:${id}`);
//     });
// });

// renderIframe(id) {
//     const iframe = document.createElement("iframe");
//     iframe.setAttribute("class", "spotify-iframe");
//     iframe.setAttribute("width", "454");
//     iframe.setAttribute("height", "300");
//     iframe.setAttribute("src", `https://open.spotify.com/embed/track/${id}`);
//     iframe.setAttribute("frameborder", "0");
//     iframe.setAttribute("allowtransparency", "true");
//     iframe.setAttribute("allow", "encrypted-media");
//     this.shadowRoot.appendChild(iframe);
// }