class Button1Element extends HTMLElement {
    constructor() {
        super();
        this.settings = {
            linkUrl: 'https://example.com',
            buttonText: 'Click Me',
            relValue: 'noopener',
            backgroundColor: '#1E90FF',
            hoverBackgroundColor: 'rgba(30, 144, 255, 0)',
            target: '_self',
            showShadow: false,
            shadowColor: '#000000',
            borderWidth: 2,
            showBorder: true,
            fontFamily: 'Montserrat'
        };
    }

    connectedCallback() {
        this.style.display = 'inline-block';
        this.innerHTML = `
            <a href="${this.settings.linkUrl}" class="btn btn-1" target="${this.settings.target}" rel="${this.settings.relValue}">
                <svg>
                    <rect x="0" y="0" fill="none" width="100%" height="100%"/>
                </svg>
                ${this.settings.buttonText}
            </a>
        `;
        this.applyStyles();
    }

    static get observedAttributes() {
        return ['settings'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'settings' && newValue !== oldValue) {
            this.settings = JSON.parse(newValue);
            this.updateButton();
        }
    }

    applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;900&display=swap');
            .btn {
                color: #fff;
                cursor: pointer;
                font-size: 16px;
                font-weight: 400;
                line-height: 45px;
                margin: 0 0 2em;
                max-width: 160px;
                position: relative;
                text-decoration: none;
                text-transform: uppercase;
                width: 100%;
                font-family: ${this.settings.fontFamily}, sans-serif;
                display: inline-block;
                text-align: center;
            }
            .btn-1 {
                background: ${this.settings.backgroundColor};
                font-weight: 100;
                box-shadow: ${this.settings.showShadow ? `0 0 10px ${this.settings.shadowColor}` : 'none'};
                border: ${this.settings.showBorder ? `${this.settings.borderWidth}px solid #fff` : 'none'};
            }
            .btn-1 svg {
                height: 45px;
                left: 0;
                position: absolute;
                top: 0;
                width: 100%;
            }
            .btn-1 rect {
                fill: none;
                stroke: #fff;
                stroke-width: ${this.settings.borderWidth};
                stroke-dasharray: 422, 0;
                transition: all 0.35s linear;
            }
            .btn-1:hover {
                background: ${this.settings.hoverBackgroundColor};
                font-weight: 900;
                letter-spacing: 1px;
            }
            .btn-1:hover rect {
                stroke-width: ${this.settings.borderWidth + 3};
                stroke-dasharray: 15, 310;
                stroke-dashoffset: 48;
                transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
            }
            @media (min-width: 600px) {
                .btn {
                    margin: 0 1em 2em;
                }
            }
        `;
        this.appendChild(style);
    }

    updateButton() {
        this.innerHTML = `
            <a href="${this.settings.linkUrl}" class="btn btn-1" target="${this.settings.target}" rel="${this.settings.relValue}">
                <svg>
                    <rect x="0" y="0" fill="none" width="100%" height="100%"/>
                </svg>
                ${this.settings.buttonText}
            </a>
        `;
        this.applyStyles();
    }
}

customElements.define('button-1', Button1Element);
