let slideUp = false;
let slideDown = true;
let currentIndex = 0;
let firstLoad = true;

loadContent(currentIndex);


document.addEventListener("DOMContentLoaded", () => {


    const sections = document.querySelectorAll('.section');

    // Görgetés figyelése
    document.addEventListener("wheel", (event) => {
            if (event.deltaY > 0 && currentIndex < sections.length - 1) {
            slideUp = true;
            slideDown = false;
            currentIndex++;
            loadContent(currentIndex);
        } 
        else if (event.deltaY < 0 && currentIndex > 0) {
            slideUp = false;
            slideDown = true;
            currentIndex--;
            loadContent(currentIndex);
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const contentDiv = document.getElementById("content");

});


function loadContent(index) {
    const contentDiv = document.getElementById("content");

    // Kimenő animáció
    if (firstLoad) {
        document.body.style.backgroundImage = `url("Image/section${index}.png")`;
    setTimeout(() => {
        document.body.style.backgroundColor = getRandomColor();

        fetch(`section${index}.html`)
            .then(response => response.text())
            .then(html => {
                contentDiv.innerHTML = html;
                
                contentDiv.style.opacity = "0";
                contentDiv.style.transform = "translateY(30px)";

                setTimeout(() => {
                    contentDiv.style.animation = "slideUpIn 0.8s ease-in-out";
                    contentDiv.style.opacity = "1";
                    contentDiv.style.transform = "translateY(0)";
                }, 50);

                hljs.highlightAll();
            })
            .catch(error => console.error('Hiba a tartalom betöltésekor:', error));
    }, 50);
        firstLoad = false;
    } else {
        if (slideUp) {
            contentDiv.style.animation = "slideUp 0.8s ease-in-out";
        }

        if (slideDown) {
            contentDiv.style.animation = "slideDown 0.8s ease-in-out";
        }
    
        setTimeout(() => {
            contentDiv.style.opacity = 0;
            document.body.style.backgroundImage = `url("Image/section${index}.png")`;
    
            fetch(`section${index}.html`)
                .then(response => response.text())
                .then(html => {
                    contentDiv.innerHTML = html;
                    
                    contentDiv.style.opacity = "0";
                    contentDiv.style.transform = "translateY(30px)";
    
                    setTimeout(() => {
                        if (slideUp) {
                            contentDiv.style.animation = "slideUpIn 0.8s ease-in-out";
                        }
                        if (slideDown) {
                            contentDiv.style.animation = "slideDownIn 0.8s ease-in-out";
                        }
                        contentDiv.style.opacity = "1";
                        contentDiv.style.transform = "translateY(0)";
                    }, 50);
    
                    hljs.highlightAll();
                })
                .catch(error => console.error('Hiba a tartalom betöltésekor:', error));
        }, 800);
    }
    
}

// Véletlenszerű háttérszín generálása
function getRandomColor() {
    const rangeR = [8, 25];
    const rangeG = [21, 47];
    const rangeB = [39, 72];
    const r = Math.floor(Math.random() * (rangeR[1] - rangeR[0] + 1)) + rangeR[0];
    const g = Math.floor(Math.random() * (rangeG[1] - rangeG[0] + 1)) + rangeG[0];
    const b = Math.floor(Math.random() * (rangeB[1] - rangeB[0] + 1)) + rangeB[0];
    return `rgb(${r}, ${g}, ${b})`;
}