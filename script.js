let timerInterval;
let elapsedTime = 0;
let lapCount = 0;
let laps = [];
let savedLaps = [];

const timeDisplay = document.getElementById('time');
const lapTimeDisplay = document.getElementById('lap-time');
const lapsTable = document.getElementById('laps');
const startButton = document.getElementById('start');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const saveButton = document.getElementById('save');
const savedLapList = document.getElementById('saved-laps');

function startTimer() {
    const startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timeDisplay.textContent = formatTime(elapsedTime);
    }, 100);
    startButton.textContent = 'Pause';
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    startButton.textContent = 'Start';
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    lapCount = 0;
    laps = [];
    timeDisplay.textContent = '00:00.00';
    lapTimeDisplay.textContent = '00:00.00';
    lapsTable.innerHTML = '';
}

function lapTimer() {
    if (timerInterval) {
        lapCount++;
        const lapTime = elapsedTime - (laps.length > 0 ? laps[laps.length - 1].totalTime : 0);
        laps.push({ lap: lapCount, lapTime, totalTime: elapsedTime });
        renderLaps();
    }
}

function renderLaps() {
    lapsTable.innerHTML = '';
    laps.forEach(lap => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${lap.lap}</td>
            <td>${formatTime(lap.lapTime)}</td>
            <td>${formatTime(lap.totalTime)}</td>
        `;
        lapsTable.appendChild(row);
    });
}

function renderSavedLaps() {
    savedLapList.innerHTML = '';
    savedLaps.forEach(lap => {
        const listItem = document.createElement('li');
        listItem.textContent = `Lap ${lap.lap}: ${formatTime(lap.lapTime)}`;
        savedLapList.appendChild(listItem);
    });
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

startButton.addEventListener('click', () => {
    if (!timerInterval) {
        startTimer();
    } else {
        pauseTimer();
    }
});

lapButton.addEventListener('click', lapTimer);
resetButton.addEventListener('click', resetTimer);

saveButton.addEventListener('click', () => {
    savedLaps = [...laps];
    renderSavedLaps();
});