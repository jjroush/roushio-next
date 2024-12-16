// Define the color codes and reset command
const RESET_TEXT_FORMAT = "\u001B[0m";
const CLEAR_SC_BUFFER = "\u001B[3J";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Define the text to display
const text = "Testing ASCII in 255 colors!";

// Create an array with the color codes
const colors = ["\u001B[31m", "\u001B[38;5;22m", "\u001B[38;5;214m", "\u001B[38;5;227m"];

(async () => {
    for (const color of colors) {
        console.log(color + text + RESET_TEXT_FORMAT);
        await sleep(759);
        console.log(CLEAR_SC_BUFFER);
    }
})();

