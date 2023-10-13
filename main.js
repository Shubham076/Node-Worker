const express = require('express');
const { Worker } = require('worker_threads');
const app = express();
const port = 3000;

const createWorker = (taskData) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js');

        worker.on('message', (result) => {
            resolve(result);
        });

        worker.on('error', reject);

        worker.on('exit', (code) => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        });

        worker.postMessage(taskData);
    });
};


app.get('/compute', async (req, res) => {
    try {
        const result = await createWorker('Start computation!');
        res.json({ result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
