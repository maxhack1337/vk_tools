import { createRoot } from 'react-dom/client';
import { createElement, Fragment } from 'react';
import { flushSync } from 'react-dom';

const renderToString = (jsx: any) => {
    const container = document.createElement('div');
    const root = createRoot(container);
    flushSync(()=>{
        root.render(createElement(Fragment, null, jsx));
    });
    return container.innerHTML;
}

export default renderToString;