class MyFrame extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    
    async connectedCallback() {
        let dato = await fetch('../storage/img/album2.json').json()
        let val = dato;
        let template = "";
        const guardar = [];

        for (let i = 0; i < dato.albums.items.length; i++) {
            if (dato.albums.items[i].data && dato.albums.items[i].data.coverArt && dato.albums.items[i].data.coverArt.sources && dato.albums.items[i].data.coverArt.sources.length > 0) {
                let names = dato.albums.items[i].data.name
                let uri = dato.albums.items[i].data.uri
                guardar.push(uri)
            }
        }

        this.innerHTML = guardar;
    }
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
}

customElements.define("my-frame", MyFrame);
