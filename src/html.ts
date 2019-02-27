const html = ({ body }: { body: string}): string => (
    `
     <!DOCTYPE html>
     <html>
        <head>
            <meta charset="UTF-8">
            <title>Preact test app</title>
        </head>
        <body>
            <div id="root">${body}</div>
            <script src="js/bundle.js"></script>
        </body>
    </html>
    `
);

export default html;
