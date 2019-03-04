const html = ({ body, preloadedState }: { body: string, preloadedState: {} }): string => (
    `
     <!DOCTYPE html>
     <html>
        <head>
            <meta charset="UTF-8">
            <title>Preact test app</title>
            <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
            </script>
        </head>
        <body>
            <div id="root">${body}</div>
            <script src="/dist/js/bundle.js" async></script>
        </body>
    </html>
    `
);

export default html;
