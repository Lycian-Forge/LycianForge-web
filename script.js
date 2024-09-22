document.getElementById('popupButton').onclick = function() {
    document.getElementById('popup').style.display = 'flex';
};

document.getElementById('closeButton').onclick = function() {
    document.getElementById('popup').style.display = 'none';
};

window.onclick = function(event) {
    const popup = document.getElementById('popup');
    if (event.target === popup) {
        popup.style.display = 'none';
    }
};