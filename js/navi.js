
const NAVI_BAR_HEIGHT = 66;

let navi_box_state = 0;
let cur_target = 0;

window.onload = () => {
    initNaviBox(false);
}

window.onresize = () => {
    initNaviBox(true);
}

function initNaviBox(from_resize) {
    console.log('init navi box');

    var navi_box = document.getElementById('__navi_box');
    var navi_bar = document.getElementById('__navi_bar');
    var frame = document.getElementById('__menu_panel_frame');
    
    var windowHeight = window.innerHeight;

    frame.style.height = windowHeight + 'px';
    navi_box.style.height = window.innerHeight + 'px';

    navi_box.style.top = '' + (-(windowHeight - NAVI_BAR_HEIGHT)) + 'px';
    navi_bar.style.top = '' + (windowHeight - NAVI_BAR_HEIGHT) + 'px';

    // switchNaviBox();  // comment it if not in debugging
}

function getNaviBoxFrameDocument() {
    return document.getElementById('__menu_panel_frame').contentDocument;
}

function switchNaviBox(target, url) {
    var navi_box = document.getElementById('__navi_box');
    var navi_bar = document.getElementById('__navi_bar');
    var more_text = document.getElementById('__more_text');
    var more_text_2 = document.getElementById('__more_text_2');
    var menu_frame = document.getElementById('__menu_panel_frame');

    var windowHeight = window.innerHeight;

    var keep = false;

    console.log('switch box: ' + target + ' to ' + url)

    if (cur_target != target) {
        if (navi_box_state == 1) {
            keep = true;
        }
    }

    if (navi_box_state == 0) {
        more_text.innerText = '演示';
        more_text_2.innerText = '问卷';

        console.log('drop navi box');

        navi_box.style.top = '0px';
        navi_box.style.backgroundColor = 'rgb(0, 0, 0, 0.8)';

        navi_box_state = 1;
        
        menu_frame.src = url;
        cur_target = target;
        
        if (target == 0) {
            more_text.innerText = '收起';
            var frame_document = getNaviBoxFrameDocument();
            
            var bgm = document.getElementById('__main_bgm');
            bgm.pause();
        } else if (target == 1) {
            more_text_2.innerText = '收起';
        }

    } else {
        if (target == 0 && !keep) {
            var frame_document = getNaviBoxFrameDocument();
            frame_document.getElementById('__video_char_demo').pause();
            
            var bgm = document.getElementById('__main_bgm');
            bgm.play();
        }

        more_text.innerText = '演示';
        more_text_2.innerText = '问卷';

        cur_target = target;

        if (keep) {
            if (target == 0) {
                more_text.innerText = '收起';
            
                var bgm = document.getElementById('__main_bgm');
                bgm.pause();
            } else if (target == 1) {
                more_text_2.innerText = '收起';
            
                var bgm = document.getElementById('__main_bgm');
                bgm.play();
            }
            console.log('keep the box');
        } else {

            console.log('collapse navi box');

            navi_box.style.top = '' + (-(windowHeight - NAVI_BAR_HEIGHT)) + 'px';
            navi_box.style.backgroundColor = 'rgb(1, 1, 1, 0.6)';

            navi_box_state = 0;
        }
    }
    
    if (keep) {
        cur_target = target;
        menu_frame.style.opacity = '0';
            setTimeout(() => {
            console.log('menu frame set src');
            menu_frame.src = url;
        }, 500);
    }
}