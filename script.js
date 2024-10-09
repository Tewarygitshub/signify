// script.js
let videoQueue = []; // Array to hold video URLs for sequential playback
let currentVideoIndex = 0; // Index to track the current video

function processInput() {
    const inputText = document.getElementById('inputText').value.toLowerCase();
    const resultDiv = document.getElementById('result');

    // Define video recommendations
    const videos = {
        'hello': 'hello.webm',
        'hi': 'hi.webm',
        'good': 'good-.webm',
        'afternoon': 'afternoon.webm',
        'book': 'book.webm',
        'eight': 'eight.webm',
        'evening': 'evening.webm',
        'five': 'five.webm',
        'four': 'four.webm',
        'goat': 'goat.webm',
        'morning': 'morning.webm',
        'name': 'name.webm',
        'nice': 'nice.webm',
        'night': 'night.webm',
        'one': 'one.webm',
        'our': 'our.webm',
        'pen': 'pen.webm',
        'pencil': 'pencil.webm',
        'presentation': 'presentation.webm',
        'six': 'six.webm',
        'thank you': 'thank-you.webm',
        'thank': 'thank.webm',
        'three': 'three.webm',
        'two': 'two.webm',
        'what': 'what.webm',
        'you': 'you.webm',
        
        
        
        
    };

    // Split input text into words
    const words = inputText.split(/\s+/);
    videoQueue = []; // Reset the queue for each new input

    // Check each word and build the queue
    words.forEach(word => {
        if (videos[word]) {
            videoQueue.push(videos[word]);
        }
    });

    // If no matches found
    if (videoQueue.length === 0) {
        const videoKeys = Object.keys(videos);
        const randomKey = videoKeys[Math.floor(Math.random() * videoKeys.length)];
        videoQueue.push(videos[randomKey]);
        resultDiv.innerHTML = '<p>No exact matches found. Playing a random video.</p>';
    }


    // Start playing videos
    playNextVideo(resultDiv);
}

function playNextVideo(resultDiv) {
    if (currentVideoIndex < videoQueue.length) {
        const videoSrc = videoQueue[currentVideoIndex];
        let videoHTML;

        if (videoSrc.endsWith('.webm')) {
            // For .webm videos
            videoHTML = `<p> <video width="350" height="350" controls autoplay muted onended="playNextVideo(resultDiv)">
                            <source src="${videoSrc}" type="video/webm">
                            Your browser does not support the video tag.
                         </video></p>`;
        } else {
            // For YouTube links
            videoHTML = `<p>Video for <strong>${videoSrc}</strong>: <a href="${videoSrc}" target="_blank">${videoSrc}</a></p>`;
        }

        resultDiv.innerHTML = videoHTML;
        
        if (videoSrc.endsWith('.webm')) {
            const videoElement = resultDiv.querySelector('video');
            videoElement.addEventListener('ended', () => {
                currentVideoIndex++;
                playNextVideo(resultDiv);
            });
        } else {
            // If it's a YouTube link, just advance the index without auto-play
            currentVideoIndex++;
        }
    } else {
        // Reset for the next input
        currentVideoIndex = 0;
    }
}
