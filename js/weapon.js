
let current_weapon_detail_navi_item = 0;
let current_weapon_detail_navi_item_2 = 0;
let page_current_weapon_id = 0;

window.onload = function() {
    intro();
    initMainBox();
    initDetailNaviItem();
    initDetailNavi2Item();
}

window.onresize = function() {
    initMainBox();
    initDetailNaviItem();
    initDetailNavi2Item();
}

function onWeaponNaviClick(weapon_id) {
    if (weapon_id == page_current_weapon_id) {
        return;
    }

    var current_weapon_id = (weapon_id + 1) % 2;
    var stage = document.getElementById('__weapon_stage_' + weapon_id);
    var cur_stage = document.getElementById('__weapon_stage_' + current_weapon_id);

    console.log('swipe, current = ' + current_weapon_id + ', to = ' + weapon_id);

    if (current_weapon_id == 0) {
        cur_stage.style.left = '-100%'
        stage.style.left = '0px';
    } else if (current_weapon_id == 1) {
        cur_stage.style.left = '100%'
        stage.style.left = '0px';
    }

    page_current_weapon_id = weapon_id;
}

function onDetailNaviItemClick(item_id, url, ext) {
    console.log('click navi: ' + item_id + ' , url = ' + url);

    var frame = document.getElementById('__weapon_detail_frame' + ext);

    frame.style.opacity = '0';
    
    setTimeout(() => {
        frame.src = url;
    }, 500);

    if (ext == '') {
        current_weapon_detail_navi_item = item_id;
        initDetailNaviItem();
    } else {
        current_weapon_detail_navi_item_2 = item_id;
        initDetailNavi2Item();
    }
}

function initDetailNaviItem() {
    var navis = document.getElementsByClassName('weapon-detail-navi-item');

    for (i = 0; i < navis.length - 2; ++i) {
        navis[i].style.scale = '0.9';
    }

    navis[current_weapon_detail_navi_item].style.scale = '1.1';
}

function initDetailNavi2Item() {
    var navis = document.getElementsByClassName('weapon-detail-navi-item');

    for (i = 2; i < navis.length; ++i) {
        navis[i].style.scale = '0.9';
    }

    navis[2 + current_weapon_detail_navi_item_2].style.scale = '1.1';
}


function intro() {
    var bar = document.getElementsByClassName('weapon-navi');
    var bar2 = document.getElementsByClassName('weapon-detail-navi-bar');
    var box = document.getElementsByClassName('weapon-view-left');
    var frame = document.getElementsByClassName('weapon-detail-frame-box');

    setTimeout(() => {
        for (i = 0; i < bar.length; ++i) {
            bar[i].style.opacity = '1';
            bar[i].style.top = '0px';
        }
    }, 0);
    
    setTimeout(() => {
        for (i = 0; i < bar2.length; ++i) {
            bar2[i].style.opacity = '1';
            bar2[i].style.top = '0px';
        }
    }, 200);

    setTimeout(() => {
        for (i = 0; i < box.length; ++i) {
            box[i].style.opacity = '1';
            box[i].style.top = '0px';
        }
    }, 500);

    setTimeout(() => {
        for (i = 0; i < frame.length; ++i) {
            frame[i].style.opacity = '1';
            frame[i].style.top = '0px';
        }
    }, 700);
}

function initMainBox() {
    console.log('init main box: height = ' + window.innerHeight);
    var box = document.getElementById('__main_box');
    box.style.height = window.innerHeight + 'px';
}