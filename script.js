

const optionCntList = [
    { value: 'monster0', text: 'スライム' },
    { value: 'monster1', text: 'ドラゴン' },
    { value: 'monster2', text: '自然' },
    { value: 'monster3', text: '物質' },
    { value: 'monster4', text: '魔獣' },
    { value: 'monster5', text: '悪魔' },
    { value: 'monster6', text: 'ゾンビ' },
    { value: 'monster7', text: '？？？' },
]

var select = $('.grand');
var keys = Object.keys(optionCntList);
keys.forEach(function (key, i) {
    /// option要素を動的に生成＆追加
    var content = this[key];
    var option = $('<option>')
        .text(content['text'])
        .val(content['value']);
    select.append(option);
}, optionCntList);



function calcRate(rate, monster, isParent) {
    var option = 2;
    if (isParent) {
        option += 2;
    }

    switch (monster) {
        case "monster0":
            rate[0] += option;
            rate[4] += option;
            rate[5] += option;
            break;
        case "monster1":
            rate[0] += option;
            rate[1] += option;
            rate[2] += option;
            break;
        case "monster2":
            rate[3] += option;
            rate[4] += option;
            rate[5] += option;
            break;
        case "monster3":
            rate[2] += option;
            rate[3] += option;
            rate[5] += option;
            break;
        case "monster4":
            rate[1] += option;
            rate[3] += option;
            rate[4] += option;
            break;
        case "monster5":
            rate[1] += option;
            rate[2] += option;
            rate[3] += option;
            break;
        case "monster6":
            rate[0] += option;
            rate[1] += option;
            rate[4] += option;
            break;
        case "monster7":
            rate[0] += option;
            rate[2] += option;
            rate[5] += option;
            break;
    };
    return rate;
}

function isBonus() {
    const array1 = [$(".grand1").val(), $(".grand2").val(), $(".grand3").val(), $(".grand4").val()];
    const array2 = [...new Set(array1)];

    if (array2.length == 4) {
        return true;
    }
    else {
        return false;
    }
}

function calc() {
    var rate = [100, 100, 100, 100, 100, 100];

    rate = calcRate(rate, $(".grand1").val(), false);
    rate = calcRate(rate, $(".grand2").val(), false);
    rate = calcRate(rate, $(".grand3").val(), false);
    rate = calcRate(rate, $(".grand4").val(), false);
    rate = calcRate(rate, $("#parant1").val(), true);
    rate = calcRate(rate, $("#parant2").val(), true);

    if (isBonus()) {
        rate[0] += 4;
        rate[1] += 4;
        rate[2] += 4;
        rate[3] += 4;
        rate[4] += 4;
        rate[5] += 4;
    }

    var max_hp = $("#hp").val() * rate[0] / 100;
    var max_mp = $("#mp").val() * rate[1] / 100;
    var max_attack = $("#attack").val() * rate[2] / 100;
    var max_defence = $("#defence").val() * rate[3] / 100;
    var max_speed = $("#speed").val() * rate[4] / 100;
    var max_intelligence = $("#intelligence").val() * rate[5] / 100;

    var action_rate = 100;

    if ($("#action1").prop("checked")) {
        action_rate = 90;
    }
    else if ($("#action2").prop("checked")) {
        action_rate = 80;
    }
    else if ($("#action3").prop("checked")) {
        action_rate = 80;
    }
    else if ($("#action4").prop("checked")) {
        action_rate = 70;
    }

    max_hp = max_hp * action_rate / 100;
    max_mp = max_mp * action_rate / 100
    max_attack = max_attack * action_rate / 100
    max_defence = max_defence * action_rate / 100
    max_speed = max_speed * action_rate / 100
    max_intelligence = max_intelligence * action_rate / 100


    if ($("#size").prop("checked")) {
        max_hp = max_hp * 150 / 100;
        max_mp = max_mp * 150 / 100
        max_attack = max_attack * 110 / 100
        max_defence = max_defence * 110 / 100
        max_speed = max_speed * 110 / 100
        max_intelligence = max_intelligence * 110 / 100
    }

    $("#max_hp").val(max_hp);
    $("#max_mp").val(max_mp);
    $("#max_attack").val(max_attack);
    $("#max_defence").val(max_defence);
    $("#max_speed").val(max_speed);
    $("#max_intelligence").val(max_intelligence);

}

calc()

$('input').change(function () {
    calc();
});


$(".parent").change(function () {
    calc();
});


function setSelectBox() {
    $("#parant1").empty();
    $("#parant2").empty();

    var option = $('<option>')
        .text($(".grand1 option:selected").text())
        .val($(".grand1").val());
    $("#parant1").append(option);

    var option = $('<option>')
        .text($(".grand2 option:selected").text())
        .val($(".grand2").val());
    $("#parant1").append(option);

    var option = $('<option>')
        .text($(".grand3 option:selected").text())
        .val($(".grand3").val());
    $("#parant2").append(option);

    var option = $('<option>')
        .text($(".grand4 option:selected").text())
        .val($(".grand4").val());
    $("#parant2").append(option);

}

$(".grand").change(function () {
    setSelectBox();
    calc();
});

setSelectBox();


document.getElementById('btn_paste').addEventListener('click', async () => {
    const text = await navigator.clipboard.readText();
    var l_text = text.split("\t")

    $("#hp").val(l_text[0]);
    $("#mp").val(l_text[1]);
    $("#attack").val(l_text[2]);
    $("#defence").val(l_text[3]);
    $("#speed").val(l_text[4]);
    $("#intelligence").val(l_text[5]);
});