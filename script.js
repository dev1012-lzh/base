const greetingSpan = document.getElementById('greeting');
const greetingSpan2 = document.getElementById('greeting2');
const loginFormInputText = document.getElementById('usernameForm');
const loginFormButton = document.getElementById('loginBtn');
const toggleMask = () => {
    document.querySelector('.mask').classList.toggle('maskViewable');
};


if (localStorage.getItem('rememberMe')) {
    if (localStorage.getItem('rememberMe') === 'true') {
        pass();
        document.title = 'Welcome!';

    } else {

        localStorage.setItem('rememberMe', 'false');
        localStorage.setItem('rememberMeBtn', 'false');
        document.querySelectorAll('.loginEl').forEach(function (element) {
            element.style.display = 'block';
            document.title = 'Login!';
        });
        document.querySelectorAll('[id*="laksamj"]').forEach(function (element) {
            element.style.display = 'none';
            document.title = 'Login!';
        });
    }
} else {
    localStorage.setItem('rememberMe', 'false');
    document.querySelectorAll('[id*="laksamj"]').forEach(function (element) {
        element.style.display = 'block';
    });
    document.querySelectorAll('.loginEl').forEach(function (element) {
        element.style.display = 'block';
    });
}

function timePassBtn(element) {
    element.classList.toggle('checked');
    if (element.classList.contains('checked')) {
        console.log('Remember me next time');
        localStorage.setItem('rememberMeBtn', 'true');
    } else {
        console.log('Forget me next time');
        localStorage.setItem('rememberMeBtn', 'false');
    }

}

function logOut() {
    localStorage.setItem('rememberMe', 'false');
    localStorage.removeItem('userName')
    window.location.reload();
}



const users = {
    "wzh": "Wong Ze Han",
    "tam10": "Tam Ee Herng",
    "admin": "Admin",
    "101210": "Lee Zi Heng"
};




loginFormButton.addEventListener('click', () => {
    const username = loginFormInputText.value;
    if (users[username]) {
        localStorage.setItem('userId', `${loginFormInputText.value}`);
        localStorage.setItem('userName', `${users[username]}`);
        if (localStorage.getItem('rememberMeBtn') === 'true') {
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.setItem('rememberMe', 'false');
        }
        pass();
    } else {
        localStorage.setItem('userId', "User not found");
        localStorage.setItem('userName', "User not found");
        showDialog('Error', '<b>User not found</b><br>Did you type carefully?', '2');
        console.warn('401 Unauthorized - User not found');
    }

});


document.addEventListener('keypress', (event => {
    if (event.key === 'Enter') {
        loginFormButton.click();
    }
}
))

function showDialog(title, message, typeOfDialog) {
    if (message && typeOfDialog) {
        if (typeOfDialog === '1' || typeOfDialog === 'Easy' || typeOfDialog === 'easy' || typeOfDialog === 1) {
            const dialog = document.createElement('div');
            dialog.style.position = 'fixed';
            dialog.style.top = '50%';
            dialog.style.left = '50%';
            dialog.style.transform = 'translate(-50%, -50%)';
            dialog.style.padding = '20px';
            dialog.style.backgroundColor = 'white';
            dialog.style.border = '1px solid #ccc';
            dialog.style.borderRadius = '10px';
            dialog.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            dialog.style.zIndex = '1000';
            const messageElem = document.createElement('p');
            messageElem.textContent = message;
            dialog.appendChild(messageElem);
            const closeButton = document.createElement('button');
            closeButton.textContent = 'Close';
            closeButton.style.marginTop = '10px';
            closeButton.onclick = function () {
                document.body.removeChild(dialog);
            };
            dialog.appendChild(closeButton);
            document.body.appendChild(dialog);
        }
        if (typeOfDialog === '2' || typeOfDialog === 'Complex' || typeOfDialog === 'complex' || typeOfDialog === 2) {
            const dialog = document.createElement('div');
            const dialogS = dialog.style;
            dialogS.position = 'fixed';
            dialogS.top = '50%';
            dialogS.left = '50%';
            dialogS.transform = 'translate(-50%, -50%)';
            dialogS.padding = '20px';
            dialogS.backgroundColor = 'white';
            dialogS.border = '1px solid #ccc';
            dialogS.borderRadius = '10px';
            dialogS.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            dialogS.zIndex = '1000';
            const messageElem = document.createElement('p');
            messageElem.innerHTML = message;
            const titleElem = document.createElement('h3');
            titleElem.innerHTML = title;
            dialog.appendChild(titleElem);
            dialog.appendChild(messageElem);
            const closeButton = document.createElement('button');
            closeButton.textContent = 'Close';
            closeButton.style.marginTop = '10px';
            closeButton.onclick = function () {
                document.body.removeChild(dialog);
            };
            dialog.appendChild(closeButton);
            document.body.appendChild(dialog);

        }
    }
}



function onload() {

    greetingSpan.innerText = "Dashboard";
    toggleMask();
    fetchPictures();
}



onload();

function pass() {

    greetingSpan2.innerText = `Welcome, ${localStorage.getItem('userId')}`;
    document.querySelectorAll('.loginEl').forEach(function (element) {
        element.style.display = 'none';
    });
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
    }, 1000);
    scrollToTop();
    disableScrolling();
}

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

document.querySelectorAll('.book').forEach(link => {
    link.addEventListener('mouseover', (event) => {
        openNewTabDiv.style.display = 'block';
        adjustPosition(event);
        document.getElementById('innerONT').innerHTML = 'Tap to open';
    });

    link.addEventListener('mousemove', (event) => {
        adjustPosition(event);
    });

    link.addEventListener('mouseout', () => {
        openNewTabDiv.style.display = 'none';
    });
});


document.querySelectorAll('img').forEach(link => {
    link.addEventListener('mouseover', (event) => {
        openNewTabDiv.style.display = 'block';
        document.getElementById('innerONT').innerHTML = 'Preview image';
        adjustPosition(event);
    });

    link.addEventListener('mousemove', (event) => {
        adjustPosition(event);
    });

    link.addEventListener('mouseout', () => {
        openNewTabDiv.style.display = 'none';
    });
});

function adjustPosition(event) {
    const divWidth = openNewTabDiv.offsetWidth;
    const divHeight = openNewTabDiv.offsetHeight;
    let left = event.pageX + 10;
    let top = event.pageY + 10;

    if (left + divWidth > window.innerWidth) {
        left = window.innerWidth - divWidth - 10;
    }

    if (top + divHeight > window.innerHeight) {
        top = window.innerHeight - divHeight - 10;
    }

    openNewTabDiv.style.left = `${left}px`;
    openNewTabDiv.style.top = `${top}px`;
}


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

const horizontalScrollable = document.querySelector('#horizontalScrollable');

if (horizontalScrollable) {
    let isDown = false;
    let startX;
    let scrollLeft;

    horizontalScrollable.addEventListener('mousedown', (e) => {
        isDown = true;
        horizontalScrollable.classList.add('active');
        startX = e.pageX - horizontalScrollable.offsetLeft;
        scrollLeft = horizontalScrollable.scrollLeft;
    });

    horizontalScrollable.addEventListener('mouseleave', () => {
        isDown = false;
        horizontalScrollable.classList.remove('active');
    });

    horizontalScrollable.addEventListener('mouseup', () => {
        isDown = false;
        horizontalScrollable.classList.remove('active');
    });

    horizontalScrollable.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - horizontalScrollable.offsetLeft;
        const walk = (x - startX) * 2; //scroll-fast
        horizontalScrollable.scrollLeft = scrollLeft - walk;
    });

    horizontalScrollable.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - horizontalScrollable.offsetLeft;
        scrollLeft = horizontalScrollable.scrollLeft;
    });

    horizontalScrollable.addEventListener('touchend', () => {
        isDown = false;
    });

    horizontalScrollable.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - horizontalScrollable.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        horizontalScrollable.scrollLeft = scrollLeft - walk;
    });
}

let isDown = false;
let startX;
let scrollLeft;

horizontalScrollable.addEventListener('mousedown', (e) => {
    isDown = true;
    horizontalScrollable.classList.add('active');
    startX = e.pageX - horizontalScrollable.offsetLeft;
    scrollLeft = horizontalScrollable.scrollLeft;
});

horizontalScrollable.addEventListener('mouseleave', () => {
    isDown = false;
    horizontalScrollable.classList.remove('active');
});

horizontalScrollable.addEventListener('mouseup', () => {
    isDown = false;
    horizontalScrollable.classList.remove('active');
});

horizontalScrollable.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - horizontalScrollable.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    horizontalScrollable.scrollLeft = scrollLeft - walk;
});

horizontalScrollable.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - horizontalScrollable.offsetLeft;
    scrollLeft = horizontalScrollable.scrollLeft;
});

horizontalScrollable.addEventListener('touchend', () => {
    isDown = false;
});

horizontalScrollable.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - horizontalScrollable.offsetLeft;
    const walk = (x - startX) * 1; //scroll-fast
    horizontalScrollable.scrollLeft = scrollLeft - walk;
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'M' || event.key === "m") {
        toggleMask();
        document.getElementById('nav').classList.toggle('navActive');
        document.getElementById('nav').classList.toggle('navNotActive');
    }
})

function toggle(type) {
    if (type) {
        if (type === 'nav' || type === 'navigation') {
            toggleMask();
            document.getElementById('nav').classList.toggle('navActive');
            document.getElementById('nav').classList.toggle('navNotActive');
        }
    }
}

function show(type) {
    if (type) {
        if (type === 'userInfo' || type === 'user') {
            showDialog('User Information', `<b>User ID</b>: ${localStorage.getItem('userId')} <br> <b>User Name</b>: ${localStorage.getItem('userName')}`, 2);
            toggle('nav');
        }
    }
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Disable scrolling function
function disableScrolling() {
    document.body.style.overflow = 'hidden';
}

// Enable scrolling function
function enableScrolling() {
    document.body.style.overflow = 'auto';
}


// Prevent pinch-zoom on the entire page
document.addEventListener('touchmove', function(event) {
    if (event.scale !== 1) {
        event.preventDefault();
    }
}, { passive: false });
