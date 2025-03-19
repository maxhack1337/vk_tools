export const innerStyleLoad = () => {
    return `.loadingOverlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            background: rgba(255, 255, 255, 0.1);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            pointer-events: all;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }

        .loadingOverlay--visible {
          opacity: 1; 
        }

        .loadingOverlay img {
            width: 128px;
            height: 128px;
        }
    
        body.loading {
            pointer-events: none;
        }
    `;
}
