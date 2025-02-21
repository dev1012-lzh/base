const greetingSpan = document.getElementById('greeting');
const greetingSpan2 = document.getElementById('greeting2');

function onload() {

    greetingSpan.innerText = "Welcome, User";
    setTimeout(() => {
        greetingSpan2.innerText = "Welcome, User";
        greetingSpan.innerText = "Dashboard";
    }, 5000);
    document.title = 'Loading...';


    fetchPictures();
}

onload();





setTimeout(function () {

    document.querySelectorAll('[id*="laksamj"]').forEach(function (element) {
        element.style.display = 'none';
    });
    var loader = document.querySelector('.loader');
    loader.classList.add('fullpage');
    setTimeout(function () {
        loader.classList.add('fullpage2');

        document.querySelectorAll('[id*="cookmj"]').forEach(function (element) {
            element.style.display = 'block';
        });

    }, 500)
    loader.classList.remove('loader');

}, 1000)


document.querySelectorAll('[id*="cookmj"]').forEach(function (element) {
    element.style.display = 'none';
});



function fetchPictures() {

    const folderPath = 'Pictures';
    const gridContainer = document.createElement('div');
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(150px, 1fr))';
    gridContainer.style.gap = '10px';
    const gridElement = document.body.querySelector('.gridPermanent');
    if (gridElement) {
        gridElement.appendChild(gridContainer);
    } else {
        console.error('Grid element not found');
    }

    for (let i = 1; i <= 10; i++) {
        const img = document.createElement('img');
        img.src = `${folderPath}/img${i}.jpg`;
        img.style.width = '100%';
        img.style.cursor = 'pointer';
        img.onerror = () => {
            img.style.display = 'none';
        };
        gridContainer.appendChild(img);
    }
}

function fetchTempImages() {
    const folderPath = 'Assets/Temp.Pictures/';
    const gridContainer = document.createElement('div');
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(150px, 1fr))';
    gridContainer.style.gap = '10px';
    const gridElement = document.body.querySelector('.gridTemp');
    if (gridElement) {
        gridElement.appendChild(gridContainer);
    } else {
        console.error('Grid element not found');
    }

    for (let i = 1; i <= 10; i++) {
        const img = document.createElement('img');
        img.src = `${folderPath}/img${i}.jpg`;
        img.style.width = '100%';
        img.style.cursor = 'pointer';
        img.onerror = () => {
            img.style.display = 'none';
        };
        gridContainer.appendChild(img);
    }
}


const openNewTabDiv = document.querySelector('.openNewTab');

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseover', (event) => {
        openNewTabDiv.style.display = 'block';
        openNewTabDiv.style.left = `${event.pageX + 0}px`;
        openNewTabDiv.style.top = `${event.pageY + 0}px`;
    });

    link.addEventListener('mousemove', (event) => {
        openNewTabDiv.style.left = `${event.pageX + 0}px`;
        openNewTabDiv.style.top = `${event.pageY + 0}px`;
    });

    link.addEventListener('mouseout', () => {
        openNewTabDiv.style.display = 'none';
    });
});


const previewContainer = document.createElement('div');
previewContainer.style.position = 'fixed';
previewContainer.style.top = '0';
previewContainer.style.left = '0';
previewContainer.style.width = '100%';
previewContainer.style.height = '100%';
previewContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
previewContainer.style.display = 'none';
previewContainer.style.justifyContent = 'center';
previewContainer.style.alignItems = 'center';
previewContainer.style.zIndex = '1000';

const previewIframe = document.createElement('iframe');
previewIframe.style.width = '80%';
previewIframe.style.height = '80%';
previewIframe.style.border = 'none';



const closeButton = document.createElement('button');
closeButton.textContent = 'Close';
closeButton.classList.add('closeBtn');

closeButton.addEventListener('click', () => {
    previewContainer.style.display = 'none';
    previewIframe.src = '';
    document.querySelectorAll('.zoomBtn').forEach(btn => btn.remove());
});

previewContainer.appendChild(previewIframe);
previewContainer.appendChild(closeButton);

document.body.appendChild(previewContainer);


document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        previewContainer.style.display = 'none';
        previewIframe.src = '';
        document.querySelectorAll('.zoomBtn').forEach(btn => btn.remove());
    }
});
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('click', (event) => {
        event.preventDefault();
        previewIframe.src = img.src;
        previewContainer.style.display = 'flex';
        previewContainer.style.justifyContent = 'center';
        previewContainer.style.alignItems = 'center';
        previewIframe.style.width = '90%';
        previewIframe.style.height = 'auto';
    });
});*/


document.querySelectorAll('img').forEach(img => {
    img.addEventListener('click', (event) => {
        event.preventDefault();
        const previewImage = document.createElement('img');
        previewImage.src = img.src;
        previewImage.style.maxWidth = '90%';
        previewImage.style.maxHeight = '90%';
        previewContainer.innerHTML = '';
        previewContainer.appendChild(previewImage);
        previewContainer.appendChild(closeButton);
        previewContainer.style.display = 'flex';

        // Add pinch to zoom and touch support
        let scale = 1;
        let startX = 0;
        let startY = 0;
        let initialPinchDistance = null;

        previewImage.addEventListener('wheel', (event) => {
            event.preventDefault();
            scale += event.deltaY * -0.01;
            scale = Math.min(Math.max(0.5, scale), 3);
            previewImage.style.transform = `scale(${scale})`;
        });

        previewImage.addEventListener('touchstart', (event) => {
            if (event.touches.length === 2) {
                initialPinchDistance = Math.hypot(
                    event.touches[0].pageX - event.touches[1].pageX,
                    event.touches[0].pageY - event.touches[1].pageY
                );
            } else if (event.touches.length === 1) {
                startX = event.touches[0].pageX - previewImage.offsetLeft;
                startY = event.touches[0].pageY - previewImage.offsetTop;
            }
        });

        previewImage.addEventListener('touchmove', (event) => {
            if (event.touches.length === 2 && initialPinchDistance) {
                const currentPinchDistance = Math.hypot(
                    event.touches[0].pageX - event.touches[1].pageX,
                    event.touches[0].pageY - event.touches[1].pageY
                );
                scale *= currentPinchDistance / initialPinchDistance;
                scale = Math.min(Math.max(0.5, scale), 3);
                previewImage.style.transformOrigin = '0 0';
                previewImage.style.transform = `translateX(${moveX}px) scale(${scale})`;

                localStorage.setItem('scale', scale);
                initialPinchDistance = currentPinchDistance;
            } else if (event.touches.length === 1) {
                const moveX = event.touches[0].pageX - startX;


                previewImage.style.transform = `translateX(${moveX / 2}px) scale(${scale})`;
            }
        });

        previewImage.addEventListener('touchend', () => {
            initialPinchDistance = null;
            previewImage.style.transform = `scale(${localStorage.getItem('scale')})`;
            previewImage.style.transformOrigin = 'center center';
        });

        // Add zoom in and zoom out buttons
        const zoomInButton = document.createElement('button');
        zoomInButton.textContent = '+';
        zoomInButton.classList.add('zoomBtn');
        zoomInButton.classList.add('zoomInBtn');
        zoomInButton.addEventListener('click', () => {
            scale = Math.min(scale + 0.3, 3);
            previewImage.style.transform = `scale(${scale})`;
            previewImage.style.transitionDuration = '0.3s';
        });

        const zoomOutButton = document.createElement('button');
        zoomOutButton.textContent = '-';
        zoomOutButton.classList.add('zoomBtn');
        zoomInButton.classList.add('zoomOutBtn');
        zoomOutButton.addEventListener('click', () => {
            scale = Math.max(scale - 0.3, 0.5);
            previewImage.style.transform = `scale(${scale})`;
            previewImage.style.transitionDuration = '0.3s';
        });
        const buttonPanels = document.createElement('div');
        buttonPanels.classList.add('buttonPanels');
        buttonPanels.appendChild(zoomOutButton);
        buttonPanels.appendChild(zoomInButton);
        previewContainer.appendChild(buttonPanels);
        previewContainer.style.display = 'flex';
    });
});