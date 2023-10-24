document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll("img");
    const resetButton = document.getElementById("reset");
    const verifyButton = document.getElementById("verify");
    const para = document.getElementById("para");

    let selectedImages = [];
    let gameState = 1;

    // Shuffle images and assign classes
    const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
    shuffle(imageClasses);
    for (let i = 0; i < images.length; i++) {
        images[i].classList.add(imageClasses[i]);
        images[i].addEventListener("click", imageClickHandler);
    }

    // Image click handler
    function imageClickHandler(event) {
        if (gameState === 4) {
            return; // Game already finished
        }

        const clickedImage = event.target;
        const clickedClass = clickedImage.classList[0];

        if (selectedImages.includes(clickedClass)) {
            return; // Same image clicked again
        }

        selectedImages.push(clickedClass);
        clickedImage.classList.add("selected");

        if (selectedImages.length === 2) {
            verifyButton.style.display = "block";
            gameState = 3;
        }

        if (selectedImages.length >= 1) {
            resetButton.style.display = "block";
            gameState = 2;
        }
    }

    // Verify button click handler
    verifyButton.addEventListener("click", function () {
        if (selectedImages.length === 2) {
            if (selectedImages[0] === selectedImages[1]) {
                para.innerHTML = "You are a human. Congratulations!";
            } else {
                para.innerHTML = "We can't verify you as a human. You selected the non-identical tiles.";
            }

            verifyButton.style.display = "none";
            gameState = 4;
        }
    });

    // Reset button click handler
    resetButton.addEventListener("click", function () {
        resetGame();
    });

    // Shuffle an array (Fisher-Yates algorithm)
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Reset the game state
    function resetGame() {
        selectedImages = [];
        gameState = 1;
        verifyButton.style.display = "none";
        resetButton.style.display = "none";
        para.innerHTML = "";
        images.forEach((image) => image.classList.remove("selected"));
    }
});
