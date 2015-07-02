var isDebugger = false;
//var isDebugger = true;
/*
 * 一幅新的扑克牌， 高一位： 花色， 1：黑桃，2：红桃， 3：梅花， 4：方片， 中二位： 数字， 1到10表示牌中的1到十， 11： J， 12： Q，
 * 13： K， 低一位： 表示正反面， 0： 背面， 1： 正面。
 */
var NEW_CARDS = [ 1010, 2010, 3010, 4010, 1020, 2020, 3020, 4020, 1030, 2030,
        3030, 4030, 1040, 2040, 3040, 4040, 1050, 2050, 3050, 4050, 1060, 2060,
        3060, 4060, 1070, 2070, 3070, 4070, 1080, 2080, 3080, 4080, 1090, 2090,
        3090, 4090, 1100, 2100, 3100, 4100, 1110, 2110, 3110, 4110, 1120, 2120,
        3120, 4120, 1130, 2130, 3130, 4130 ];
/*
 * list0表示闲牌堆， list1到list7表示台面上七列牌
 */
var list0, list1, list2, list3, list4, list5, list6, list7;


/*
 * 是否需要对整个台面进行重画
 */
var isNeedRedraw = false;
/*
 * 合理的投放区坐标
 */
var list1Area_x = 0;
var list1Area_y = 0;
var list2Area_x = 0;
var list2Area_y = 0;
var list3Area_x = 0;
var list3Area_y = 0;
var list4Area_x = 0;
var list4Area_y = 0;
var list5Area_x = 0;
var list5Area_y = 0;
var list6Area_x = 0;
var list6Area_y = 0;
var list7Area_x = 0;
var list7Area_y = 0;
var resultAArea_x = 610;
var relultAArea_y = 34;
var resultBArea_x = 740;
var relultBArea_y = 34;
var resultCArea_x = 870;
var relultCArea_y = 34;
var resultDArea_x = 1000;
var relultDArea_y = 34;

var disX = 0;
var disY = 0;

/*
 * 表示已归结列表当前最大数
 */
var resultA = 0;
var resultB = 0;
var resultC = 0;
var resultD = 0;

/*
 * 闲牌数量
 */
var freeCardLength = 0;
/*
 * 当前闲牌指针， -1表示没有翻闲牌堆
 */
var freeCardCursor = -1;

/*
 * 屏蔽鼠标右键菜单
 */
document.oncontextmenu = function() {
    return false;
}

window.onload = function() {
    initGame();
}

/*
 * 初始化游戏
 */

function initGame() {
    startGame();
    // TODO: 对各种事件进行绑定

}

/*
 * 开始游戏
 */
function startGame() {
    mess();
    drawDesktopCards();
}
/*
 * 对背着的闲牌堆的点击进行处理
 */
function handleCardStack(event){
   freeCardCursor ++;
   if(freeCardCursor === freeCardLength){
       freeCardCursor = -1;
   }
   
}
/*
 * 动态对所有的牌进行事件绑定
 */
function setFrontCard(obj) {
    // console.log(obj);
    obj.ondblclick = function(event) {
        event.stopPropagation();

        handleDblClickCard(event);
        if (isNeedRedraw) {
            drawDesktopCards();
        }

        clearInterval(obj.timer);
        return false;// 低版本出现禁止符号
    }
}

/*
 * 对牌的双击事件进行处理
 */
function handleDblClickCard(event) {
    var element = event.target;
    var fromListNum = $(element).data('from-list');
    var index = $(element).data('index-in-list');
    var num = $(element).data('num');
    if (fromListNum != 0) {
        var fromList;
        switch (fromListNum) {
        case 0:

            break;
        case 1:
            handleCard(list1, index);
            break;
        case 2:
            handleCard(list2, index);
            break;
        case 3:
            handleCard(list3, index);
            break;
        case 4:
            handleCard(list4, index);
            break;
        case 5:
            handleCard(list5, index);
            break;
        case 6:
            handleCard(list6, index);
            break;
        case 7:
            handleCard(list7, index);
            break;
        default:
            // do nothing
        }
        function handleCard(list, index) {
            // 只有一叠牌中暴露在最外面的一张才会对double click进行处理
            if (index < list.length - 1) {
                return;
            }
            // 取到该张牌
            var card = list[index];
            var style = getCardStyle(card);
            if (style === 1) {
                if (num === resultA + 1) {
                    resultA++;
                    list.pop();
                    isNeedRedraw = true;
                }
            } else if (style === 2) {
                if (num === resultB + 1) {
                    resultB++;
                    list.pop();
                    isNeedRedraw = true;
                }
            } else if (style === 3) {
                if (num === resultC + 1) {
                    resultC++;
                    list.pop();
                    isNeedRedraw = true;
                }
            } else if (style === 4) {
                if (num === resultD + 1) {
                    resultD++;
                    list.pop();
                    isNeedRedraw = true;
                }
            }
        }
    }else{
        var card = list0[freeCardCursor];
        var styleNum = getCardStyle(card);
        var number = getCardNum(card);
        switch(styleNum){
            case 1:
                if(number === resultA + 1){
                    resultA ++;
                    list0.splice(freeCardCursor,1);
                    freeCardCursor --;
                    freeCardLength = list0.length;
                    isNeedRedraw = true;
                }
                break;
            case 2:
                if(number === resultB + 1){
                    resultB ++;
                    list0.splice(freeCardCursor,1);
                    freeCardCursor --;
                    freeCardLength = list0.length;
                    isNeedRedraw = true;
                }
                break;
            case 3:
                if(number === resultC + 1){
                    resultC ++;
                    list0.splice(freeCardCursor,1);
                    freeCardCursor --;
                    freeCardLength = list0.length;
                    isNeedRedraw = true;
                }
                break;
            case 4:
                if(number === resultD + 1){
                    resultD ++;
                    list0.splice(freeCardCursor,1);
                    freeCardCursor --;
                    freeCardLength = list0.length;
                    isNeedRedraw = true;
                }
                break;
            default:
                
        }
    }
}
/*
 * 动态对背面向上的牌进行事件绑定
 */
function setBackCard(obj) {
    obj.onclick = function(event) {
        event.stopPropagation();
        handleClickBackCard(event);
        if (isNeedRedraw) {
            drawDesktopCards();
        }
        clearInterval(obj.timer);
        return false;// 低版本出现禁止符号
    }
}
/*
 * 对背面向上的牌的click事件进行处理
 */
function handleClickBackCard(event) {
    var element = event.target;
    var fromListNum = $(element).data('from-list');
    var index = $(element).data('index-in-list');
    var fromList;
    switch (fromListNum) {
    case 0:

        break;
    case 1:
        handelList(list1, index);
        break;
    case 2:
        handelList(list2, index);
        break;
    case 3:
        handelList(list3, index);
        break;
    case 4:
        handelList(list4, index);
        break;
    case 5:
        handelList(list5, index);
        break;
    case 6:
        handelList(list6, index);
        break;
    case 7:
        handelList(list7, index);
        break;
    default:
        // do nothing
    }
    function handelList(fromList, index) {
        if (index === fromList.length - 1 && isBack(fromList[index])) {
            fromList[index] = fromList[index] + 1;
            isNeedRedraw = true;
        }
        return fromList;
    }

}
/*
 * 动态对可拖拽的元素进行绑定
 */
function setDrag(obj) {
    obj.onmouseover = function() {
        // obj.style.cursor = "pointer";
    }
    obj.onmousedown = function(event) {
        event.stopPropagation();
        var scrollTop = document.documentElement.scrollTop
                || document.body.scrollTop;
        var scrollLeft = document.documentElement.scrollLeft
                || document.body.scrollLeft;
        obj.style.zIndex = 999;
        // 当鼠标按下时计算鼠标与拖拽对象的距离
        disX = event.clientX + scrollLeft - obj.offsetLeft;
        disY = event.clientY + scrollTop - obj.offsetTop;

        var element = event.target;

        var ori_l = $(element).offset().left;
        var ori_t = $(element).offset().top;
        document.onmousemove = function(event) {
            // 当鼠标拖动时计算div的位置
            var l = event.clientX - disX + scrollLeft;
            var t = event.clientY - disY + scrollTop;

            obj.style.left = l + "px";
            obj.style.top = t + "px";
        }
        document.onmouseup = function() {
            document.onmousemove = null;// 当鼠标弹起时移出移动事件
            document.onmouseup = null;// 移出up事件，清空内存
            var element = event.target;
            var l = $(element).offset().left;
            var t = $(element).offset().top;
            if (l != ori_l || t != ori_t) {
                isNeedRedraw = true;
            }

            // 判断将被拖拽的元素投入到哪个投放取里了
            if (l >= list1Area_x - 20 && l <= list1Area_x + 90
                    && t >= list1Area_y - 15 && t <= list1Area_y + 145) {
                // 正确的第1列投放区
//                console.log('放进了第1列的正确位置');
                list1 = handleInList(element, list1);
            } else if (l >= list2Area_x - 20 && l <= list2Area_x + 90
                    && t >= list2Area_y - 15 && t <= list2Area_y + 145) {
                // 正确的第2列投放区
//                console.log('放进了第2列的正确位置');
                list2 = handleInList(element, list2);
            } else if (l >= list3Area_x - 20 && l <= list3Area_x + 90
                    && t >= list3Area_y - 15 && t <= list3Area_y + 145) {
                // 正确的第3列投放区
//                console.log('放进了第3列的正确位置');
                list3 = handleInList(element, list3);
            } else if (l >= list4Area_x - 20 && l <= list4Area_x + 90
                    && t >= list4Area_y - 15 && t <= list4Area_y + 145) {
                // 正确的第4列投放区
//                console.log('放进了第4列的正确位置');
                list4 = handleInList(element, list4);
            } else if (l >= list5Area_x - 20 && l <= list5Area_x + 90
                    && t >= list5Area_y - 15 && t <= list5Area_y + 145) {
                // 正确的第5列投放区
//                console.log('放进了第5列的正确位置');
                list5 = handleInList(element, list5);
            } else if (l >= list6Area_x - 20 && l <= list6Area_x + 90
                    && t >= list6Area_y - 15 && t <= list6Area_y + 145) {
                // 正确的第6列投放区
//                console.log('放进了第6列的正确位置');
                list6 = handleInList(element, list6);
            } else if (l >= list7Area_x - 20 && l <= list7Area_x + 90
                    && t >= list7Area_y - 15 && t <= list7Area_y + 145) {
                // 正确的第7列投放区
//                console.log('放进了第7列的正确位置');
                list7 = handleInList(element, list7);
            } else if (l >= resultAArea_x - 25 && l <= resultAArea_x + 25
                    && t >= relultAArea_y - 25 && t <= relultAArea_y + 75) {
                // 正确的黑桃投放区
//                console.log('放进了黑桃的正确位置');
                handleInResult(element, 1);
            } else if (l >= resultBArea_x - 25 && l <= resultBArea_x + 25
                    && t >= relultBArea_y - 25 && t <= relultBArea_y + 75) {
                // 正确的黑桃投放区
//                console.log('放进了红桃的正确位置');
                handleInResult(element, 2);
            } else if (l >= resultCArea_x - 25 && l <= resultCArea_x + 25
                    && t >= relultCArea_y - 25 && t <= relultCArea_y + 75) {
                // 正确的黑桃投放区
//                console.log('放进了梅花的正确位置');
                handleInResult(element, 3);
            } else if (l >= resultDArea_x - 25 && l <= resultDArea_x + 25
                    && t >= relultDArea_y - 25 && t <= relultDArea_y + 75) {
                // 正确的黑桃投放区
//                console.log('放进了方片的正确位置');
                handleInResult(element, 4);
            }
            // 重新画页面
            if (isNeedRedraw) {
                drawDesktopCards();
            }

        }
        // clearInterval(obj.timer);
        return false;// 低版本出现禁止符号
    }
}
/*
 * 对正确进入List的元素列表进行处理，暂不考虑规则
 */
function handleInList(element, toList) {

    var fromListNum = $(element).data('from-list');
    var index = $(element).data('index-in-list');
    var inResult = $(element).data('in-result');
    var number = $(element).data('num');
    var isFromList = (fromListNum != undefined);
    var fromList;
    // 列对列
    if (isFromList) {
        switch (fromListNum) {
        case 0:
            fromList = list0;
            break;
        case 1:
            fromList = list1;
            break;
        case 2:
            fromList = list2;
            break;
        case 3:
            fromList = list3;
            break;
        case 4:
            fromList = list4;
            break;
        case 5:
            fromList = list5;
            break;
        case 6:
            fromList = list6;
            break;
        case 7:
            fromList = list7;
            break;
        default:
            // do nothing
        }
        // 如果将牌移到当前列，则不进行任何处理
        if (fromList === toList) {
            return toList;
        }
        // 此处加入纸牌的规则部分处理
        var fromCard;
        if(fromListNum != 0){
            fromCard = fromList[index];
        }else{
            fromCard = list0[freeCardCursor];
        }
        
        var toCard = toList[toList.length - 1];
        // 如果被移动的牌堆的最下面一颗牌是背面的，则不允许别的牌移入
        if (toList.length > 0 && isBack(toCard)) {
            return toList;
        }
        // 如果被移动牌串的第一张与要移到位置牌串的最后一张的颜色相同，则不允许移入
        if (toList.length > 0 && isRedCard(fromCard) === isRedCard(toCard)) {
            return toList;
        }
        // 如果被移动牌串的第一张的数值 不比要移到位置牌串的最后一张的数值小1，则不允许移入
        if (toList.length > 0 && getCardNum(fromCard) != getCardNum(toCard) - 1) {
            return toList;
        }
        // 如果某一列为空，则只允许K移入到该列
        if (toList.length === 0 && getCardNum(fromCard) != 13) {
            return toList;
        }

        if (fromListNum != 0) {
            var tempList = fromList.splice(index);
            toList = toList.concat(tempList);
        } else {
            toList.push(fromCard);
            list0.splice(freeCardCursor,1);
            freeCardCursor --;
            freeCardLength = list0.length;
            
        }
    }
    // 结果对列
    else{
     // 此处加入纸牌的规则部分处理
        var fromCard = inResult * 1000 + number *10 + 1;
        var toCard = toList[toList.length - 1];
        // 如果被移动的牌堆的最下面一颗牌是背面的，则不允许别的牌移入
        if (toList.length > 0 && isBack(toCard)) {
            return toList;
        }
        // 如果被移动牌串的第一张与要移到位置牌串的最后一张的颜色相同，则不允许移入
        if (toList.length > 0 && isRedCard(fromCard) === isRedCard(toCard)) {
            return toList;
        }
        // 如果被移动牌串的第一张的数值 不比要移到位置牌串的最后一张的数值小1，则不允许移入
        if (toList.length > 0 && getCardNum(fromCard) != getCardNum(toCard) - 1) {
            return toList;
        }
        // 如果某一列为空，则只允许K移入到该列
        if (toList.length === 0 && getCardNum(fromCard) != 13) {
            return toList;
        }
        toList.push(fromCard);
        if(inResult === 1) resultA --;
        if(inResult === 2) resultB --;
        if(inResult === 3) resultC --;
        if(inResult === 4) resultD --;

    }

    return toList;
}
/*
 * 判断牌是不是背面
 */
function isBack(card) {
    return ((card % 10) === 0);

}

/*
 * 获取牌面的数值
 */
function getCardNum(card) {
    var num = Math.floor((card % 1000) / 10);
    return num;
}
/*
 * 获取牌面的花色
 */
function getCardStyle(card) {
    var styleNum = Math.floor(card / 1000);
    return styleNum;
}
/*
 * 判断是否是红色的牌，牌非红即黑
 */
function isRedCard(card) {
    var styleNum = Math.floor(card / 1000);
    return (styleNum === 2 || styleNum === 4);
}
/*
 * 对正确进入Result的元素列表进行处理，暂不考虑规则
 */
function handleInResult(element, style) {
    var fromListNum = $(element).data('from-list');
    var index = $(element).data('index-in-list');
    var num = $(element).data('num');
    if (fromListNum != 0) {
        var fromList;
        switch (fromListNum) {
        case 0:

            break;
        case 1:
            handleCard(list1, index, style);
            break;
        case 2:
            handleCard(list2, index, style);
            break;
        case 3:
            handleCard(list3, index, style);
            break;
        case 4:
            handleCard(list4, index, style);
            break;
        case 5:
            handleCard(list5, index, style);
            break;
        case 6:
            handleCard(list6, index, style);
            break;
        case 7:
            handleCard(list7, index, style);
            break;
        default:
            // do nothing
        }
        function handleCard(list, index, style) {
            // 只有一叠牌中暴露在最外面的一张才会对double click进行处理
            if (index < list.length - 1) {
                return;
            }
            // 取到该张牌
            var card = list[index];
            var styleNum = getCardStyle(card);
            if(styleNum != style){
                return;
            }
            if(style === 1){
                if (num === resultA + 1) {
                    resultA ++;
                    list.pop();
                    isNeedRedraw = true;
                }
            }
            if(style === 2){
                if (num === resultB + 1) {
                    resultB ++;
                    list.pop();
                    isNeedRedraw = true;
                }
            }
            if(style === 3){
                if (num === resultC + 1) {
                    resultC ++;
                    list.pop();
                    isNeedRedraw = true;
                }
            }
            if(style === 4){
                if (num === resultD + 1) {
                    resultD ++;
                    list.pop();
                    isNeedRedraw = true;
                }
            }

        }
    
    }else{
        var card = list0[freeCardCursor];
        var styleNum = getCardStyle(card);
        var number = getCardNum(card);
        if(styleNum != style){
            return;
        }
        if(style === 1){
            if(number === resultA + 1){
                resultA ++;
                list0.splice(freeCardCursor,1);
                freeCardCursor --;
                freeCardLength = list0.length;
                isNeedRedraw = true;
            }
        }
        if(style === 2){
            if(number === resultB + 1){
                resultB ++;
                list0.splice(freeCardCursor,1);
                freeCardCursor --;
                freeCardLength = list0.length;
                isNeedRedraw = true;
            }
        }
        if(style === 3){
            if(number === resultC + 1){
                resultC ++;
                list0.splice(freeCardCursor,1);
                freeCardCursor --;
                freeCardLength = list0.length;
                isNeedRedraw = true;
            }
        }
        if(style === 4){
            if(number === resultD + 1){
                resultD ++;
                list0.splice(freeCardCursor,1);
                freeCardCursor --;
                freeCardLength = list0.length;
                isNeedRedraw = true;
            }
        }
        
    }
}
/*
 * 洗牌
 */
function mess() {
    var cards = NEW_CARDS.slice(0);
    var random, item;
    // 第一列
    random = getRandomNum(0, cards.length - 1);
    item = cards[random];
    cards.splice(random, 1);
    item++;
    list1 = new Array();
    list1.push(item);
    // 第二列
    list2 = new Array();
    for ( var i = 0; i < 2; i++) {
        random = getRandomNum(0, cards.length - 1);
        item = cards[random];
        cards.splice(random, 1);
        if (i === 1) {
            item++;
        }
        list2.push(item);
    }
    // 第三列
    list3 = new Array();
    for ( var i = 0; i < 3; i++) {
        random = getRandomNum(0, cards.length - 1);
        item = cards[random];
        cards.splice(random, 1);
        if (i === 2) {
            item++;
        }
        list3.push(item);
    }
    // 第四列
    list4 = new Array();
    for ( var i = 0; i < 4; i++) {
        random = getRandomNum(0, cards.length - 1);
        item = cards[random];
        cards.splice(random, 1);
        if (i === 3) {
            item++;
        }
        list4.push(item);
    }
    // 第五列
    list5 = new Array();
    for ( var i = 0; i < 5; i++) {
        random = getRandomNum(0, cards.length - 1);
        item = cards[random];
        cards.splice(random, 1);
        if (i === 4) {
            item++;
        }
        list5.push(item);
    }
    // 第六列
    list6 = new Array();
    for ( var i = 0; i < 6; i++) {
        random = getRandomNum(0, cards.length - 1);
        item = cards[random];
        cards.splice(random, 1);
        if (i === 5) {
            item++;
        }
        list6.push(item);
    }
    // 第七列
    list7 = new Array();
    for ( var i = 0; i < 7; i++) {
        random = getRandomNum(0, cards.length - 1);
        item = cards[random];
        cards.splice(random, 1);
        if (i === 6) {
            item++;
        }
        list7.push(item);
    }
    // 闲牌堆
    list0 = new Array();    
    for (var i = 0; i < 24; i++) {
        random = getRandomNum(0, cards.length - 1);
        item = cards[random];
        cards.splice(random, 1);
        list0.push(item + 1);
    }
    freeCardLength = list0.length;
}

/*
 * 产生随机整数 param: min 随机数下限 param: max 随机数上限
 */
function getRandomNum(min, max) {
    var range = max - min;
    var rand = Math.random();
    return (min + Math.round(rand * range));
}

/*
 * 对桌面上的七列扑克进行渲染
 */
function drawDesktopCards() {
    // 对左上角闲牌进行处理
    var cardStack = $('#card-stack');
    if(freeCardCursor === freeCardLength -1){
        cardStack.css('opacity','0');
    }else{
        cardStack.css('opacity','1');
    }
    var showCardElement = $('#show-card');
    showCardElement.html($(''));
    for(var i = 0 ; i < freeCardCursor + 1 ; i ++){
        var showCard = list0[i];
        var num = getCardNum(showCard);
        var styleNum = getCardStyle(showCard);
        switch (styleNum) {
            case 1:
                style = 'ca';
                break;
            case 2:
                style = 'cb';
                break;
            case 3:
                style = 'cc';
                break;
            case 4:
                style = 'cd';
                break;
            default:
                // do nothing
        }
        var card = '<div class="card-wrapper canDrag"><div class="card ' + style + ' c'
                + num + ' c-front" style="z-index:20;" data-from-list="0" data-num="' + num + '"></div></div>';
        $(card).appendTo(showCardElement);
    
    }
    
    // 对下面的七列进行处理
    var currentList, curentElement;

    for ( var i = 1; i < 8; i++) {
        switch (i) {
        case 1:
            currentList = list1;
            curentElement = $('#l-1');
            break;
        case 2:
            currentList = list2;
            curentElement = $('#l-2');
            break;
        case 3:
            currentList = list3;
            curentElement = $('#l-3');
            break;
        case 4:
            currentList = list4;
            curentElement = $('#l-4');
            break;
        case 5:
            currentList = list5;
            curentElement = $('#l-5');
            break;
        case 6:
            currentList = list6;
            curentElement = $('#l-6');
            break;
        case 7:
            currentList = list7;
            curentElement = $('#l-7');
            break;
        default:
            // do nothing
        }
        $(curentElement).html($(''));
        var innerHtml = '';
        var marginBase = 0;
        var margin = 10
        for ( var j = 0; j < currentList.length; j++) {
            var status = currentList[j];
            // 花式
            var styleNum = Math.floor(status / 1000);
            var style;
            switch (styleNum) {
            case 1:
                style = 'ca';
                break;
            case 2:
                style = 'cb';
                break;
            case 3:
                style = 'cc';
                break;
            case 4:
                style = 'cd';
                break;
            default:
                // do nothing
            }
            // 数值
            var num = Math.floor((status % 1000) / 10);
            // 正反
            var isBack = ((status % 10) === 0);
            var card = '';
            card = '<div class="card-wrapper ';
            if (!isBack) {
                // 只有正面的牌才能拖拽
                card += 'canDrag';
            }
            card += '" data-cards-num="';
            card += (currentList.length - j);
            card += '">';
            card += '<div class="card ';
            card += 'c' + num + ' ' + style;
            if (isBack) {
                card += ' c-back';
            } else {
                card += ' c-front';
            }
            card += '" ';
            var zindex = 10 + j;
            card += 'style="z-index: ' + zindex;
            marginBase += margin;
            card += '; top: ' + marginBase + 'px;" data-style="' + style
                    + '" data-num="' + num + '" data-index-in-list="' + j
                    + '" data-from-list="' + i + '"></div>';
            if (!isBack) {
                margin = 30;
            }
            innerHtml += card;
        }
        for ( var k = 0; k < currentList.length; k++) {
            innerHtml += '</div>';
        }
        $(innerHtml).appendTo(curentElement);

    }

    // 对右上方的四个结果框进行处理
    var resuleElement = $('#r-a');
    resuleElement.html($(''));
    var card = '';
    if (resultA > 0) {
        for ( var i = 1; i <= resultA; i++) {
            var zindex = 10 + i;
            card += '<div class="card-wrapper canDrag"><div class="card ca c'
                    + i + '" style="z-index:' + zindex
                    + ';" data-in-result="1" data-num="' + i + '"></div></div>';
        }
    }
    $(card).appendTo(resuleElement);
    resuleElement = $('#r-b');
    resuleElement.html($(''));
    var card = '';
    if (resultB > 0) {
        for ( var i = 1; i <= resultB; i++) {
            var zindex = 10 + i;
            card += '<div class="card-wrapper canDrag"><div class="card cb c'
                    + i + '" style="z-index:' + zindex
                    + ';" data-in-result="2" data-num="' + i + '"></div></div>';
        }
    }
    $(card).appendTo(resuleElement);
    resuleElement = $('#r-c');
    resuleElement.html($(''));
    var card = '';
    if (resultC > 0) {
        for ( var i = 1; i <= resultC; i++) {
            var zindex = 10 + i;
            card += '<div class="card-wrapper canDrag"><div class="card cc c'
                    + i + '" style="z-index:' + zindex
                    + ';" data-in-result="3" data-num="' + i + '"></div></div>';
        }
    }
    $(card).appendTo(resuleElement);
    resuleElement = $('#r-d');
    resuleElement.html($(''));
    var card = '';
    if (resultD > 0) {
        for ( var i = 1; i <= resultD; i++) {
            var zindex = 10 + i;
            card += '<div class="card-wrapper canDrag"><div class="card cd c'
                    + i + '" style="z-index:' + zindex
                    + ';" data-in-result="4" data-num="' + i + '"></div></div>';
        }
    }
    $(card).appendTo(resuleElement);

    // 对可拖拽区域进行处理
    computeArea();
    // 对事件进行绑定
    
    var cardStack = document.getElementById('card-stack');
    cardStack.onclick = function(event){
        handleCardStack(event);
        drawDesktopCards();
        clearInterval(cardStack);
        return false;
    };
    var backCards = document.getElementsByClassName('c-back');
    for ( var i = 0; i < backCards.length; i++) {
        setBackCard(backCards[i]);
    }
    var frontCards = document.getElementsByClassName('c-front');
    for ( var i = 0; i < frontCards.length; i++) {
        setFrontCard(frontCards[i]);
    }
    var canDrags = document.getElementsByClassName('canDrag');
    for ( var i = 0; i < canDrags.length; i++) {
        setDrag(canDrags[i]);
    }
    if(isWin()){
        win();
        return ;
    }
    isNeedRedraw = false;
}

/*
 * 计算合理的投放区
 */
function computeArea() {
    list1Area_x = 127;
    list2Area_x = 267;
    list3Area_x = 407;
    list4Area_x = 547;
    list5Area_x = 687;
    list6Area_x = 827;
    list7Area_x = 967;
    var baseY = 288;
    var y = baseY;
    if (isDebugger) {
        $('.canArea').remove();
        showCanAreaForResult(resultAArea_x, relultAArea_y);
        showCanAreaForResult(resultBArea_x, relultBArea_y);
        showCanAreaForResult(resultCArea_x, relultCArea_y);
        showCanAreaForResult(resultDArea_x, relultDArea_y);
    }
    var canAreaStr = '';
    for ( var i = 0; i < list1.length; i++) {
        var card = list1[i];
        var isBack = ((card % 10) === 0);
        if (isBack) {
            y += 10;
        } else {
            y += 30;
        }
    }
    list1Area_y = y;
    if (isDebugger) {
        // console.log('list 1 area x === ' + list1Area_x);
        // console.log('list 1 area y === ' + list1Area_y);
        showCanArea(list1Area_x, list1Area_y);
    }

    y = baseY;
    for ( var i = 0; i < list2.length; i++) {
        var card = list2[i];
        var isBack = ((card % 10) === 0);
        if (isBack) {
            y += 10;
        } else {
            y += 30;
        }
    }
    list2Area_y = y;
    if (isDebugger) {
        // console.log('list 2 area x === ' + list2Area_x);
        // console.log('list 2 area y === ' + (list2Area_y - 288));
        showCanArea(list2Area_x, list2Area_y);
    }
    y = baseY;
    for ( var i = 0; i < list3.length; i++) {
        var card = list3[i];
        var isBack = ((card % 10) === 0);
        if (isBack) {
            y += 10;
        } else {
            y += 30;
        }
    }
    list3Area_y = y;
    if (isDebugger) {
        // console.log('list 3 area x === ' + list3Area_x);
        // console.log('list 3 area y === ' + list3Area_y);
        showCanArea(list3Area_x, list3Area_y);
    }
    y = baseY;
    for ( var i = 0; i < list4.length; i++) {
        var card = list4[i];
        var isBack = ((card % 10) === 0);
        if (isBack) {
            y += 10;
        } else {
            y += 30;
        }
    }
    list4Area_y = y;
    if (isDebugger) {
        // console.log('list 4 area x === ' + list4Area_x);
        // console.log('list 4 area y === ' + list4Area_y);
        showCanArea(list4Area_x, list4Area_y);
    }
    y = baseY;
    for ( var i = 0; i < list5.length; i++) {
        var card = list5[i];
        var isBack = ((card % 10) === 0);
        if (isBack) {
            y += 10;
        } else {
            y += 30;
        }
    }
    list5Area_y = y;
    if (isDebugger) {
        // console.log('list 5 area x === ' + list5Area_x);
        // console.log('list 5 area y === ' + list5Area_y);
        showCanArea(list5Area_x, list5Area_y);
    }
    y = baseY;
    for ( var i = 0; i < list6.length; i++) {
        var card = list6[i];
        var isBack = ((card % 10) === 0);
        if (isBack) {
            y += 10;
        } else {
            y += 30;
        }
    }
    list6Area_y = y;
    if (isDebugger) {
        // console.log('list 6 area x === ' + list6Area_x);
        // console.log('list 6 area y === ' + list6Area_y);
        showCanArea(list6Area_x, list6Area_y);
    }
    y = baseY;
    for ( var i = 0; i < list7.length; i++) {
        var card = list7[i];
        var isBack = ((card % 10) === 0);
        if (isBack) {
            y += 10;
        } else {
            y += 30;
        }
    }
    list7Area_y = y;
    if (isDebugger) {
        // console.log('list 7 area x === ' + list7Area_x);
        // console.log('list 7 area y === ' + list7Area_y);
        showCanArea(list7Area_x, list7Area_y);
    }
}
function isWin(){
    return (resultA === 13 && resultB === 13 && resultC === 13 && resultD === 13);
}
function win(){
    alert('你赢了！！！');
}
function showCanArea(x, y) {
    canAreaStr = '<div class="canArea" style="z-index: 999; position: absolute; left: '
            + (x - 20)
            + 'px; top: '
            + (y - 15)
            + 'px; background: yellow; width: 110px; height: 140px; opacity: .5;"></div>';
    var disktop = $('.desktop');
    $(canAreaStr).appendTo(disktop);
}

function showCanAreaForResult(x, y) {
    canAreaStr = '<div class="canArea" style="z-index: 999; position: absolute; left: '
            + (x - 25)
            + 'px; top: '
            + (y - 25)
            + 'px; background: yellow; width: 50px; height: 100px; opacity: .5;"></div>';
    var disktop = $('.desktop');
    $(canAreaStr).appendTo(disktop);
}