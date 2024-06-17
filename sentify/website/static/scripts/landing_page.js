function typeEffect(elementId, sentences, typingSpeed = 100, pauseBetweenSentences = 2000) {
    const element = document.getElementById(elementId);
    let sentenceIndex = 0;
    let letterIndex = 0;
    let currentSentence = '';
    let isDeleting = false;

    function type() {
        if (sentenceIndex === sentences.length) {
            sentenceIndex = 0; // Loop back to the first sentence
        }
        currentSentence = sentences[sentenceIndex];

        if (!isDeleting) {
            // Typing forward
            element.textContent = currentSentence.slice(0, letterIndex++);
            if (letterIndex > currentSentence.length) {
                // Pause at the end of a sentence
                isDeleting = true;
                setTimeout(type, pauseBetweenSentences);
            } else {
                setTimeout(type, typingSpeed);
            }
        } else {
            // Deleting backward
            element.textContent = currentSentence.slice(0, letterIndex--);
            if (letterIndex === 0) {
                // Move to the next sentence
                isDeleting = false;
                sentenceIndex++;
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(type, typingSpeed / 2); // Deleting is usually faster
            }
        }
    }

    type(); // Start the typing effect
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
    const phrases = [
        'Opinion?',
        'Impact?',
        'Reaction?'
    ];
    typeEffect('dynamic-word', phrases);
});