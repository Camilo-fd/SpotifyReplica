class MyFrame extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const uri = this.getAttribute("uri");
        if (uri) {
            const [, , id] = uri.split(":");
            this.renderIframe(id);
        }
    }

    renderIframe(id) {
        const iframe = document.createElement("iframe");
        iframe.setAttribute("class", "spotify-iframe");
        iframe.setAttribute("width", "454");
        iframe.setAttribute("height", "300");
        iframe.setAttribute("src", `https://open.spotify.com/embed/track/${id}`);
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowtransparency", "true");
        iframe.setAttribute("allow", "encrypted-media");
        this.shadowRoot.appendChild(iframe);
    }

    static get observedAttributes() {
        return ["uri"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "uri" && oldValue !== newValue) {
            const [, , id] = newValue.split(":");
            this.shadowRoot.innerHTML = ""; // Limpiamos el shadow DOM antes de renderizar el nuevo iframe
            this.renderIframe(id);
        }
    }
}

customElements.define("my-frame", MyFrame);
