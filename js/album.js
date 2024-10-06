
window.onload = () => {
    initMainBox();
    initPosterBox();
    initPosterTitle();
    initAlbumFrameWindow();
    initCollectionPosters();
}

window.onresize = () => {
    initMainBox();
    initPosterBox();
    initPosterTitle();
    initAlbumFrameWindow();
}

function initMainBox() {
    console.log('init main box: height = ' + window.innerHeight);
    var box = document.getElementById('__main_box');
    box.style.height = window.innerHeight + 'px';
}

function initPosterBox() {
    var boxes = document.getElementsByClassName('collection-poster-box');
    for (i = 0; i < boxes.length; ++i) {
        boxes[i].style.height = ((window.innerHeight - 67) / 3) + 'px';
    }
}

function initPosterTitle() {
    var boxes = document.getElementsByClassName('poster-title-box');
    var eachColHeight = (window.innerHeight - 67) / 3;

    for (i = 0; i < boxes.length; ++i) {
        boxes[i].style.top = (i * eachColHeight + eachColHeight / 2 - 50) + 'px';
    }
}

const windowPadding = 20;

function initAlbumFrameWindow() {
    var win = document.getElementById('__album_frame_window');
    var containerHeight = window.innerHeight - 67;
    var containerWidth = window.innerWidth;

    win.style.left = windowPadding + 'px';
    win.style.width = (containerWidth - windowPadding * 2) + 'px';
    win.style.top = windowPadding + 'px';
    win.style.height = (containerHeight - windowPadding * 2) + 'px';
}

function swipeContainerWith(window_name, catalog, count) {
    var collection_container = document.getElementById('__collection_poster_container');
    var album_container = document.getElementById('__album_frame_container');
    var title = document.getElementById('__album_frame_window_title');
    var frame = document.getElementById('__album_page_frame');

    setTimeout(() => {
        collection_container.style.left = '-100%';
        album_container.style.left = '0px';
        title.innerText = window_name;
    }, 100);

    frame.src = './_album_page.html?catalog=' + catalog + '&count=' + count;
}

function swipeBackContainer() {
    var collection_container = document.getElementById('__collection_poster_container');
    var album_container = document.getElementById('__album_frame_container');
    collection_container.style.left = '0px';
    album_container.style.left = '100%';
}

function initCollectionPosters() {
    
    var box = document.getElementById('__collection_poster_box_1');
    box.style.marginLeft = '0px';
    
    var box = document.getElementById('__collection_poster_box_2');
    box.style.marginLeft = '0px';

    var box = document.getElementById('__collection_poster_box_3');
    box.style.marginLeft = '0px';
}