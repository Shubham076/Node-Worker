const { parentPort } = require('worker_threads');

const computeSum = () => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
        sum += i;
    }
    return sum;
};

parentPort.on('message', (data) => {
    if (data === 'Start computation!') {
        const result = computeSum();
        parentPort.postMessage(result);
    }
});
