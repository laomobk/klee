

let ARTF_INFO_TEXT = [
    [
        '魔女的炎之花', 
        '曾经梦想烧尽世间魔物的魔女触碰过的花朵。<br>无名的火舌温暖地舔舐触碰它的人。',
        `
        就物种而言平凡无奇的寻常花朵，<br>
        却在持续抗拒着炎之魔女的焚烧。<br>
        <br>
        百年前的灾厄到来时，少女失去了被许诺拥有的一切。<br>
        珍惜的人们、往昔的岁月、灿烂的未来，全部碎裂了。<br>
        <br>
        从烟与余烬中，炎之魔女诞生了，用火灭却一切伤痛。<br>
        但这朵花始终烧不尽，始终保持着生机、柔软与湿润，<br>
        或许其中承载着的痛苦与美好记忆各是她的一体两面。<br>
        `
    ],
    [
        '魔女常燃之羽',
        '曾经梦想烧尽世间魔物的魔女触碰过的鸟羽，<br>在恒常的燃烧中挥发着烈焰的温度。',
        `无休止地焦灼崩毁着的火红鸟羽。<br>
        无论燃烧了多久，也不会被烧尽。<br>
        <br>
        因为选择了狱火的道路，她走过的原野都只余下灰烬。<br>
        即使她焚烧的都是害人的魔物，当远处的火光亮起时，<br>
        人们都会紧闭门窗，驱逐炎之魔女。但这之于她无妨。<br>
        <br>
        必须有人将所有伤痛烧尽，才能带来新的希望，她想。<br>
        不需要理解。不需要人慰藉。也不需要任何人的同情。<br>
        能明白炎之魔女无言寂寞的，只有落在她身旁的鸟儿。`
    ],
    [
        '魔女破灭之时',
        '曾经梦想烧尽世间魔物的魔女佩戴的时计，<br>其中流淌着的是魔女献给火焰的岁月 。',
        `缓慢地流淌着高热溶液的小器皿，<br>
        传说其中流淌的是被融化的邪灵。<br>
        <br>
        燃烧的魔女还是少女时，灾厄尚未来临时，她远行前，<br>
        获赠的特制水时计。走完一周的时间等于她在教令院进修所需的时间。<br>
        当时计走完时，当她回到故乡时，赠她时计的人已经沦为灾厄的食粮。<br>
        <br>
        少女的时间就此结束，炎之魔女的破灭之时就此开始，<br>
        直到世间一切魔物和世间一切魔物造成的痛苦被烧尽。<br>
        `
    ],
    [
        '魔女的心之火',
        '曾经梦想烧尽世间魔物的炎之魔女留下的流火之甕。<br>瓶中火永不熄灭，一如其人。',
        `透彻的琉璃瓶，其中流淌着液火。<br>
        如今流体液态火的做法已经失传。<br>
        <br>
        在炎之魔女行遍各地，用酷烈炙热的烈火焚烧魔物时，<br>
        人们传说她放弃了人的血肉，体内奔流的是液态流火。<br>
        <br>
        但即便是她，也曾经是少女，心中也曾有过爱与思慕，<br>
        直到一把火将少女心中一切美好而柔弱的部分烧尽了。<br>
        从此她成了史家不愿记载的魔女。
        `
    ], 
    [
        '焦灼的魔女帽',
        '曾经梦想烧尽世间魔物的炎之魔女曾经戴过的帽子。<br>宽大的帽檐能遮挡她的视线。',
        `有着宽大帽檐的传统尖头魔女帽，<br>
        能为魔女带来敬畏与恐惧的目光。<br>
        <br>
        对于炎之魔女而言，这样的大帽子能屏断周围的芜杂，<br>
        在她早年求学时，得以心无旁骛地磨砺自己的火之力。<br>
        <br>
        在她投身战斗后，不必看着被烈焰啃噬的魔物在狂舞中散成灰的模样。<br>
        在望向水面时，也不必看见自己因为烟雾与烈焰变得焦灼破碎的面容。<br>
        魔女就是这样盲目地持续燃烧的。`
    ]
]

// Game Object Class

__ARTF_STATE_ROTATING = 1;
__ARTF_STATE_CENTERED = 2;
__ARTF_STATE_MOVING = 3;

let __current_centered_game_object = null;

function GameObject(height, width, vx, vy, img_src, index) {
    this.height = height;
    this.width = width;
    this.vx = vx;
    this.vy = vy;
    this.img_src = img_src;
    this.scale = 1.0;
    this.index = index;

    this.__anim_t = 0;
    this.__anim_func = null;

    this.__img = new Image();
    this.__img.onload = () => {
        console.log('img loaded: ' + img_src);
        console.log(this);
    }
    this.__img.src = img_src;
    this.__hover_state__ = false;

    this.__state = __ARTF_STATE_ROTATING;
    this.__anim_finish_state = 0;

    this.draw = () => {
        var _width = this.width * this.scale;
        var _height = this.height * this.scale;
        var ox = this.vx * CANVAS.width;
        var oy = this.vy * CANVAS.height;

        var ofsX = (this.width - _width) / 2;
        var ofsY = (this.height - _height) / 2;

        CANVAS_CTX.drawImage(this.__img, ox + ofsX, oy + ofsY, _width, _height);
    }

    this.absCentered = (ox, oy) => {
        return [ox - this.width / 2, oy - this.height / 2];
    }

    this.viewCentered = (vx, vy) => {
        return [(vx * CANVAS.width - this.width / 2) / CANVAS.width, 
                (vy * CANVAS.height - this.height / 2) / CANVAS.height];
    }

    this.checkHitAbs = (ox, oy) => {
        var x = this.vx * CANVAS.width;
        var y = this.vy * CANVAS.height;

        if (ox >= x && ox <= x + this.width && oy >= y && oy <= y + this.height) {
            return true;
        }
        
        return false;
    }

    this.update = (delta) => {}

    this.onHoverStateChange = (state) => {}
    this.onClick = () => {}
}

window.onload = () => {
    initMainCanvas();
    fitMainContentBox();
    initGameObjects();
}

window.onresize = () => {
    fitMainContentBox();
}

let CANVAS_CTX = null;
let CANVAS = null;
let __gameObjects = [];
let MOUSE_MOVE_EVENT = null;

let ARTF_IMGS = [
    '../static/artf_flower.webp',
    '../static/artf_wing.webp',
    '../static/artf_hourg.webp',
    '../static/artf_heart.webp',
    '../static/artf_hat.webp',
]

let ARTF_IMG_SIZE = [
    [211, 219],
    [202, 234],
    [215, 248],
    [180, 228],
    [222, 208],
]

let __go_circle_points = [
    [0, 0],
    [100, 0],
    [200, 0],
    [300, 0],
    [400, 0]
];

let __circle_center_v = [0.5, 0.5];
let __circle_radius_px = 250;
let SPRITE_SCALE = 0.55;
let SPRITE_HOVER_SCALE_INC = 0.05;

function __AnimMoveToCenterCurveFunction(this_, bvx, bvy) {
    return (t) => {
        var dx = toAx(bvx) - toAx(this_.vx);
        var dy = toAy(bvy) - toAy(this_.vy);

        return [toVx(dx * t + toAx(this_.vx)), toVy(dy *t + toAy(this_.vy))];
    }
}

function __AnimMoveToCircleCurveFunction(avx, avy, index, this_) {
    var aax = toAx(avx);
    var aay = toAy(avy);
    
    return (t) => {
        var dx = toAx(__go_circle_points[index][0]) - toAx(this_.vx);
        var dy = toAy(__go_circle_points[index][1]) - toAy(this_.vy);

        return [toVx(dx * t + toAx(this_.vx)), toVy(dy * t + toAy(this_.vy))];
    }
}

let __anim_time = 0.5;

function __onArtifactObjectUpdate(delta) {
    if (this.__state == __ARTF_STATE_ROTATING) {
        [this.vx, this.vy] = __go_circle_points[this.index];
    } else if (this.__state == __ARTF_STATE_MOVING) {
        [this.vx, this.vy] = this.__anim_func(this.__anim_t);

        this.__anim_t += (delta / __anim_time);

        if (this.__anim_t >= 1) {
            this.__state = this.__anim_finish_state;
        }
    }
}

function __onArtifactObjectHoverStateChange(state) {
    this.scale = state ? SPRITE_SCALE + SPRITE_HOVER_SCALE_INC : SPRITE_SCALE;
}

function __onArtifactObjectClick(auto = false) {
    if (this.__state == __ARTF_STATE_ROTATING) {
        if (__current_centered_game_object) {
            if (__current_centered_game_object.__state == __ARTF_STATE_MOVING) {
                return;  // if last piece anim not finished.
            }
            console.log('occupied: ' + __current_centered_game_object.index);
            __current_centered_game_object.onClick(true);
        } else {
            switchArtifactDetailPanel(1)
        }
        
        __current_centered_game_object = this;

        this.__state = __ARTF_STATE_MOVING;
        this.__anim_finish_state = __ARTF_STATE_CENTERED;
        this.__anim_t = 0;

        var [ctvx, ctvy] = this.viewCentered(__circle_center_v[0], __circle_center_v[1]);
        this.__anim_func = __AnimMoveToCenterCurveFunction(this, ctvx, ctvy);

        setArtifactDetail(this.index);
    } else if (this.__state == __ARTF_STATE_CENTERED) {
        console.log('move back');

        this.__state = __ARTF_STATE_MOVING;
        this.__anim_finish_state = __ARTF_STATE_ROTATING;
        this.__anim_t = 0;
        
        this.__anim_func = __AnimMoveToCircleCurveFunction(this.vx, this.vy, this.index, this);

        if (!auto) {
            __current_centered_game_object = null;
            switchArtifactDetailPanel(0);
        }
    }
}

function switchArtifactDetailPanel(panel) {
    var piece_panel = document.getElementById('__detail_panel_piece');
    var cover_panel = document.getElementById('__detail_panel_cover');

    if (panel == 1) {
        cover_panel.style.opacity = '0';
        piece_panel.style.opacity = '0';

        setTimeout(() => {
            cover_panel.style.display = 'none';
            piece_panel.style.display = 'block';

            setTimeout(() => {
                piece_panel.style.opacity = '1';
            }, 50);
        }, 500);
    } else if (panel == 0) {
        cover_panel.style.opacity = '0';
        piece_panel.style.opacity = '0';

        setTimeout(() => {
            piece_panel.style.display = 'none';
            cover_panel.style.display = 'block';

            setTimeout(() => {
                cover_panel.style.opacity = '1';
            }, 50);
        }, 500);
    }
}

function setArtifactDetail(index) {
    var img = document.getElementById('__artf_img');
    var name = document.getElementById('__detail_name');
    var sub = document.getElementById('__detail_sub');
    var story = document.getElementById('__detail_story');

    name.style.opacity = '0';
    sub.style.opacity = '0';
    story.style.opacity = '0';

    setTimeout(() => {
        name.innerHTML = ARTF_INFO_TEXT[index][0];
        name.style.opacity = '1';
    }, 500);

    setTimeout(() => {
        sub.innerHTML = ARTF_INFO_TEXT[index][1];
        sub.style.opacity = '1';
    }, 500);

    setTimeout(() => {
        story.innerHTML = ARTF_INFO_TEXT[index][2];
        story.style.opacity = '1';
    }, 500);

    img.style.backgroundImage = 'url(' + ARTF_IMGS[index] + ')';
}

function toVx(x) {
    return x / CANVAS.width;
}

function toVy(y) {
    return y / CANVAS.height;
}

function toAx(vx) {
    return vx * CANVAS.width;
}

function toAy(vy) {
    return vy * CANVAS.height;
}

function initGameObjects() {
    for (i = 0; i < 5; ++i) {
        var [x, y] = __go_circle_points[i];
        var [w, h] = ARTF_IMG_SIZE[i]
        
        var go = new GameObject(h, w, toVx(x), toVy(y), ARTF_IMGS[i], i);
        go.scale = SPRITE_SCALE;

        go.update = __onArtifactObjectUpdate;
        go.onHoverStateChange = __onArtifactObjectHoverStateChange;
        go.onClick = __onArtifactObjectClick;

        __gameObjects.push(go);
    }
}

let __STORY_FONT_SIZE = 18;
let __NAME_FONT_SIZE = 30;
let __SUB_FONT_SIZE = 15;

let __TITLE_FONT_SIZE_FACTOR_X = 7.086e-2;
let __TITLE_FONT_SIZE_FACTOR_Y = -6.579e-2;

function fitMainContentBox() {
    console.log('setting main box: ' + window.innerWidth + 'x' + window.innerHeight);

    var box = document.getElementById('__main_content_box');
    var canvas = document.getElementById('__main_canvas');
    canvas.height = window.innerHeight - 67;
    canvas.width = window.innerWidth * 0.6;

    box.style.height = (window.innerHeight - 67) + 'px';

    var right_width = window.innerWidth * 0.4;
    var right_height = (window.innerHeight - 80);

    var detail_box = document.getElementById('__detail_box');
    var cover_panel = document.getElementById('__detail_panel_cover');
    var piece_panel = document.getElementById('__detail_panel_piece');

    var story_text = document.getElementById('__detail_story');
    var name_text = document.getElementById('__detail_name');
    var sub_text = document.getElementById('__detail_sub');
    
    var set_title = document.getElementById('__artf_set_title');
    var set_sub_title = document.getElementById('__artf_set_sub_title');

    detail_box.style.width = right_width + 'px';
    cover_panel.style.width = right_width - 50 + 'px';
    piece_panel.style.width = right_width - 50 + 'px';
    detail_box.style.height = right_height + 'px';
    cover_panel.style.height = right_height - 30 + 'px';
    piece_panel.style.height = right_height - 30 + 'px';

    var ratio = -0.2 * window.devicePixelRatio + 1.4;
    if (ratio <= 0) {
        ratio = 2;
    }
    
    story_text.style.fontSize = __STORY_FONT_SIZE * ratio + 'px';
    name_text.style.fontSize = __NAME_FONT_SIZE * ratio + 'px';
    sub_text.style.fontSize = __SUB_FONT_SIZE * ratio + 'px';
    
    set_title.style.fontSize = window.innerWidth * __TITLE_FONT_SIZE_FACTOR_X + 
                                window.innerHeight * __TITLE_FONT_SIZE_FACTOR_Y + 'px';
    set_sub_title.style.fontSize = 0.5 * (window.innerWidth * __TITLE_FONT_SIZE_FACTOR_X + 
                                            window.innerHeight * __TITLE_FONT_SIZE_FACTOR_Y) + 'px';
}

function initMainCanvas() {
    var canvas = document.getElementById('__main_canvas');

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        CANVAS_CTX = ctx;
        CANVAS = canvas;

        canvas.onmousemove = (e) => {
            onCanvasMouseMove(e);
        }

        canvas.onclick = (e) => {
            console.log('canvas click: ' + e);
            onCanvasMouseClick(e);
        }

        console.log('canvas init OK.');

        window.requestAnimationFrame(canvasUpdate);
    } else {
        alert('您的浏览器似乎不支持 Canvas，无法正常显示该页面！');
    }
}

function updateGameObjects(delta) {
    for (i = 0; i < __gameObjects.length; ++i) {
        __gameObjects[i].update(delta);
    }
}

function drawGameObjects() {
    for (i = 0; i < __gameObjects.length; ++i) {
        __gameObjects[i].draw();
    }
}

function onCanvasMouseMove(event) {
    MOUSE_MOVE_EVENT = event;

    for (i = 0; i < __gameObjects.length; ++i) {
        var hit = __gameObjects[i].checkHitAbs(event.offsetX, event.offsetY);

        if (hit != __gameObjects[i].__hover_state__) {
            __gameObjects[i].__hover_state__ = hit;
            __gameObjects[i].onHoverStateChange(hit);
        }
    }
}

function onCanvasMouseClick(event) {
    MOUSE_MOVE_EVENT = event;

    for (i = 0; i < __gameObjects.length; ++i) {
        var hit = __gameObjects[i].checkHitAbs(event.offsetX, event.offsetY);
        
        if (hit) {
            console.log('hit: ' + i);
            __gameObjects[i].onClick();
        }
    }
}

function canvasClear() {
    CANVAS_CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
}

let __angle = 0;
let __ROTATE_SPEED = 0.3;

function updateCircle(delta) {
    let angle = __angle;

    for (i = 0; i < 5; ++i) {
        var cy = -__circle_radius_px * Math.sin(angle);
        var cx = __circle_radius_px * Math.cos(angle);

        var [ctvx, ctvy] = __circle_center_v;
        var ctx = toAx(ctvx);
        var cty = toAy(ctvy);

        __go_circle_points[i] = __gameObjects[i].viewCentered(toVx(ctx + cx), toVy(cty + cy));

        angle += 1.256;  // 2 * pi / 5;
    }

    __angle += delta * __ROTATE_SPEED;
}

let __prev_timestamp = -16;

function canvasUpdate(timestamp) {
    var delta_time = (timestamp - __prev_timestamp) / 1000;

    updateCircle(delta_time);

    canvasClear();

    updateGameObjects(delta_time);
    drawGameObjects();

    __prev_timestamp = timestamp;

    window.requestAnimationFrame(canvasUpdate);
}