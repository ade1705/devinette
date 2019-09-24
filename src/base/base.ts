import { Express } from 'express';

const startServer = (app:Express): void => {
    const port = 3000;
    app.listen(port, (err) => {
        if (err) {
            return console.error(err);
        }
    });
};

export { startServer };