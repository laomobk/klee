
let selected_story = 0;
let current_frame_url = './pages/main.html';
let char_box_state = 0;

window.onload = function() {
    initStoryNaviStick();
    initMainBox();
    initSlogan();
}

window.onresize = () => {
    initMainBox();
}

function initSlogan() {
    var slogan = document.getElementById('__char_slogan');
    
    setTimeout(() => {
        slogan.style.opacity = '1';
    }, 1200);
}

function switchCharBox() {
    var char_box = document.getElementById('__char_box');
    var main_box = document.getElementById('__main_box');
    var sub_title = document.getElementById('__char_sub_title');

    if (char_box_state == 0) {
        main_box.style.backgroundImage = 'url(../static/bg_new_skin.png)';
        char_box.style.backgroundImage = 'url(../static/klee_new_skin.png)';
        sub_title.style.opacity = '1';
        char_box_state = 1;
    } else {
        main_box.style.backgroundImage = 'url(../static/background.jpg)';
        char_box.style.backgroundImage = 'url(../static/klee.png)';
        sub_title.style.opacity = '0';
        char_box_state = 0;
    }
}

function initMainBox() {
    console.log('init main box: height = ' + window.innerHeight);
    var box = document.getElementById('__main_box');
    box.style.height = window.innerHeight + 'px';
    box = document.getElementById('__char_box');
    box.style.height = window.innerHeight + 'px';
}

function initStoryNaviStick() {
    for (i = 0; i < 6; ++i) {
        var stick = document.getElementById('__story_stick_' + i);
        stick.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }

    var stick = document.getElementById('__story_stick_' + selected_story);
    stick.style.backgroundColor = 'antiquewhite';
}

function playAudioClip(id) {
    var audio = document.getElementById(id);

    audio.play();
    console.log("play audio: " + id);
}

function setFrameUrl(url) {
    var frame = document.getElementById('__frame');

    console.log('set frame url: ' + url);
    frame.style.opacity = "0.0";

    setTimeout(() => {
        console.log('frame set src');
        frame.src = url;

        if (url.startsWith(current_frame_url.substring(0, 10))) {
            console.log('local anchor...')
            frame.style.opacity = '1'  // local anchor
        }
    }, 500);
}

function setCharacterStory(storyID) {
    var content = document.getElementById('__story_box_content');
    content.style.opacity = '0';

    selected_story = storyID;
    initStoryNaviStick();
    
    setTimeout(() => {

        if (storyID == 0) {
            content.innerHTML = "<h2>角色故事 壹</h2>" + 
                                '<p id="__story_content">' +
                                "三年前，可莉被身为知名冒险家的父母托付给西风骑士团。年幼的可莉就这样和“那位白色的哥哥”一起，与蒙德的“家人们”结下了缘分。可莉对外界一切都抱有纯真的爱与好奇。对于会爆炸的物件，她更是始终投以极度的热忱。在骑士团呵护之下，她得以远离恶意与中伤。小小的少女与骑士团众人缔结了无法割舍的缘分。对可莉来说，被琴关禁闭室的日常、帮助安柏改进兔兔伯爵的日常，或偷偷研制新型炸弹的日常，所有这些，都是她珍贵的宝物。" +
                                "</p>";
        } else if (storyID == 1) {
            content.innerHTML = "<h2>角色故事 贰</h2>" + 
                                '<p id="__story_content">' +
                                "“那样的父母会培养出这样的孩子，也是理所当然吧。”被成堆公物破坏报告搞得焦头烂额的代理团长琴，偶尔会扶额感叹。炸得七零八落的车辆、莫名起火的货棚、骑士们好不容易才扑灭的森林火灾，还有惨不忍睹的“星落湖鱼类大量非正常伤亡案件”造成这些的凶手只有一人，此人正出现在骑士团总部。“可莉！”面对代理团长严厉的目光，看似人畜无害的小小少女只好把身上藏得满满当当的爆炸物逐件上缴。随后在幸灾乐祸的骑兵队长护送下，哭唧唧地前往禁闭室。这样的故事，大概每周都会重演那么一两次。" +
                                "</p>";
        } else if (storyID == 2) {
            content.innerHTML = "<h2>角色故事 叁</h2>" + 
                                '<p id="__story_content">' +
                                "当然，每次闯完祸后，可莉也会努力帮忙收拾烂摊子。虽说有时又会因为她大剌剌的性子将事情搅得更加复杂：想要做烤鱼补偿骑士团的大家，却不小心把灶台炸上了天；焦急地想要借风灭火，又把火扩散到了更远的草原，可莉绝不是坏孩子，好奇与贪玩的本性却总驱使她做出不计后果的行为。而每次犯了错误，又总会愧疚地试图弥补。但凡可莉被满心郁闷的琴团长放出禁闭室，不出两天，蒙德城某处一定又会传来爆炸声。作为骑士团内大名鼎鼎的“火花骑士”，其威能总会在奇怪的地方频繁展现。" +
                                "</p>";
        } else if (storyID == 3) {
            content.innerHTML = "<h2>角色故事 肆</h2>" + 
                                '<p id="__story_content">' +
                                "虽说可莉为骑士团和蒙德城招惹了不少乱子，但她绝不是为骑士团拖后腿的见习新人。相反，一旦她的才能用对地方，也将爆发出可畏的实力。某次讨伐行动中，琴巧妙借助可莉的爆破天赋，一举消灭了所有进犯的丘丘人。只是可莉出于一贯不计后果的童心，布下了过多炸弹，造成巨大爆炸，永久改变了望风山地的地貌，大家都被吓得不轻，所幸骑士团无人受伤。“望风山地红衣骑士”的传说，就此在蒙德城流传开来。据说她身披一席神秘红衣，怀中抱着骑士团最隐秘的宝物，只有可莉本人知道，空穴来风的“宝物”究竟是什么东西。" +
                                "</p>";
        } else if (storyID == 4) {
            content.innerHTML = "<h2>角色故事 伍</h2>" + 
                                '<p id="__story_content">' +
                                "对可莉而言，骑士团是她不可或缺的家人，已踏上冒险征途的母亲则是“偶像”。著名大冒险家艾莉丝，《提瓦特游览指南》的作者，在可莉心中，妈妈非常厉害，无所不能。无论是从前手把手教她调配火药挑选引信，还是一步步引导她依照个人创意制造更壮观漂亮的烟花，教育她如何规划受力点，才能炸毁整座摘星崖，或是被骑士团抓到现行之后一起在面色发青的霍夫曼面前挨训，对彼此尴尬地吐舌头，这些都是可莉与妈妈珍藏的记忆。直到后来，妈妈和爸爸去了很遥远、很危险的地方，临行前，将可莉托付给阿贝多哥哥和骑士团。小小的可莉早就明白，自己总有一天也会长大，踏上妈妈的道路。总有一天，她的作品也会让妈妈为之骄傲。" +
                                "</p>";
        } else if (storyID == 5) {
            content.innerHTML = "<h2>角色故事 嘟嘟可</h2>" + 
                                '<p id="__story_content">' +
                                "“嘟嘟可”是可莉最初的朋友，也是最好的朋友之一。很久很久以前，妈妈亲手为她制作了这个玩偶。艾莉丝把它与可莉的幸运四叶草缀在一起，挂在可莉大大的背包上。于是，嘟嘟可和可莉成为了形影不离的好朋友。妈妈说，这是为了让可莉不会孤单，有一个独处时也能说悄悄话的朋友。困难时也会保护彼此，就像安柏与她的兔兔伯爵那样。不过这话让骑士团众人忧心忡忡，考虑到艾莉丝母女二人的其他“发明”，这东西或许也会在某个时刻爆炸。“嘟嘟可”是可莉自己为玩偶取的名字。被人问到这个名字的含义，可莉涨红了脸，半天才说：“含义是，可莉最好的朋友！”" +
                                "</p>";
        }

        content.style.opacity = '1';
    }, 200);
}