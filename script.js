document.addEventListener('DOMContentLoaded', () => {
    // 1. Define the letter-to-number mapping
    const letterValues = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 8, 'G': 3, 'H': 5,
        'I': 1, 'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 7, 'P': 8,
        'Q': 1, 'R': 2, 'S': 3, 'T': 4, 'U': 6, 'V': 6, 'W': 6, 'X': 5,
        'Y': 1, 'Z': 7
    };

    // 2. Define the "pass" numbers
    const passNumbers = [14, 23, 32, 41, 50, 15, 24, 33, 42, 51];

    // 3. Get DOM elements
    const nameInput = document.getElementById('nameInput');
    const calculateBtn = document.getElementById('calculateBtn');
    const breakdownDiv = document.getElementById('breakdown');
    const totalValueP = document.getElementById('totalValue');
    const resultMessageP = document.getElementById('resultMessage');

    // Function to clear previous results and reset animations
    function clearResults() {
        breakdownDiv.innerHTML = '';
        totalValueP.textContent = '';
        resultMessageP.textContent = '';
        resultMessageP.className = 'result-message'; // Reset classes

        // Reset opacity/transform for re-animation
        totalValueP.style.opacity = 0;
        totalValueP.style.transform = 'translateY(15px)';
        resultMessageP.style.opacity = 0;
        resultMessageP.style.transform = 'translateY(20px)';
    }

    // 4. Function to calculate and display the name value
    function calculateNameValue() {
        const name = nameInput.value.trim().toUpperCase(); // Get input, remove whitespace, convert to uppercase

        clearResults(); // Clear any previous results

        if (name === '') {
            resultMessageP.textContent = "Please enter a name.";
            resultMessageP.classList.add('fail'); // Indicate it's a message, not a pass
            resultMessageP.style.opacity = 1;
            resultMessageP.style.transform = 'translateY(0)';
            return;
        }

        let total = 0;
        let delayCounter = 0;

        // Create an array to hold breakdown elements
        const breakdownElements = [];

        for (let i = 0; i < name.length; i++) {
            const char = name[i];
            const value = letterValues[char] || 0; // Get value, default to 0 for non-alphabet chars

            // Only add to breakdown if it's an actual letter (or not a space)
            if (char !== ' ' && letterValues.hasOwnProperty(char)) {
                total += value;

                const span = document.createElement('span');
                span.classList.add('letter-value');
                span.textContent = `${char} = ${value}`;
                span.style.setProperty('--delay', `${delayCounter * 0.05}s`); // Staggered animation
                breakdownElements.push(span);
                delayCounter++;
            } else if (char === ' ') {
                // If it's a space, optionally add a visual separator or just skip
                // For this example, we'll just skip adding it to the breakdown,
                // but its value is already 0 so it won't affect the total.
            }
            // Non-mapped characters will have value 0 and won't be added to breakdown.
        }

        // Append all breakdown elements at once for better performance
        breakdownElements.forEach(el => breakdownDiv.appendChild(el));

        // Display total value
        totalValueP.textContent = `Total Value: ${total}`;
        totalValueP.style.opacity = 1;
        totalValueP.style.transform = 'translateY(0)';

        // Determine and display pass/fail message
        setTimeout(() => {
            if (passNumbers.includes(total)) {
                resultMessageP.textContent = "Name is Pass! 🎉";
                resultMessageP.classList.add('pass');
            } else {
                resultMessageP.textContent = "Try other Name. 😞";
                resultMessageP.classList.add('fail');
            }
            resultMessageP.style.opacity = 1;
            resultMessageP.style.transform = 'translateY(0)';
        }, (delayCounter * 0.05 * 1000) + 300); // Delay message until breakdown is mostly animated + extra time
    }

    // 5. Event Listeners
    calculateBtn.addEventListener('click', calculateNameValue);

    nameInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            calculateNameValue();
        }
    });

    // Optional: Clear results when input changes, for a cleaner UX
    nameInput.addEventListener('input', clearResults);
});