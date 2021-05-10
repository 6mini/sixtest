const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const endPoint = qnaList.length;
const result = document.querySelector("#result")
const select = [];
let resultword = [];



// 클립보드로 복사하는 기능
function copyToClipboard(elementId) {
  var aux = document.createElement("input");
  aux.setAttribute("value", document.getElementById(elementId).innerHTML);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  alert('복사가 완료되었습니다.');
}

function goMbtiresult(mbti){
    if (mbti === 'enfp') {
    location.href='/job/designer';
    } if (mbti === 'enfj') {
        location.href='/job/teacher';
    } if (mbti === 'infp') {
        location.href='/job/author';
    } if (mbti === 'infj') {
        location.href='/job/psychologist';

    } if (mbti === 'entp') {
        location.href='/job/architect';
    } if (mbti === 'entj') {
        location.href='/job/broker';
    } if (mbti === 'intp') {
        location.href='/job/programmer';
    } if (mbti === 'intj') {
        location.href='/job/expert';

    } if (mbti === 'estj') {
        location.href='/job/agent';
    } if (mbti === 'esfj') {
        location.href='/job/promotion';
    } if (mbti === 'istj') {
        location.href='/job/official';
    } if (mbti === 'isfj') {
        location.href='/job/therapist';

    } if (mbti === 'estp') {
        location.href='/job/police';
    } if (mbti === 'esfp') {
        location.href='/job/comedian';
    } if (mbti === 'istp') {
        location.href='/job/pilot';
    } if (mbti === 'isfp') {
        location.href='/job/cook';
    }
}

function calResult(){
    let ei = [
        {name: 'e', value: 0},
        {name: 'i', value: 0}
    ];
    let ns = [
        {name: 'n', value: 0},
        {name: 's', value: 0}
    ];
    let ft = [
        {name: 'f', value: 0},
        {name: 't', value: 0}
    ];
    let pj = [
        {name: 'p', value: 0},
        {name: 'j', value: 0}
    ]
    for (let i = 0; i < 3; i++) {
        if(select[i] === "0") {
            ei[0].value += 1;
        }
        if(select[i] === "1") {
            ei[1].value += 1;
        }
    }
    for (let i = 3; i < 6; i++) {
        if(select[i] === "0") {
            ns[0].value += 1;
        }
        if(select[i] === "1") {
            ns[1].value += 1;
        }
    }
    for (let i = 6; i < 9; i++) {
        if(select[i] === "0") {
            ft[0].value += 1;
        }
        if(select[i] === "1") {
            ft[1].value += 1;
        }
    }
    for (let i = 9; i < 12; i++) {
        if(select[i] === "0") {
            pj[0].value += 1;
        }
        if(select[i] === "1") {
            pj[1].value += 1;
        }
    }


    for (let i = 0; i < ei.length; i++) {
        if (ei[i].value >= 2) {
            resultword.push(ei[i].name);
        }
    }
    for (let i = 0; i < ns.length; i++) {
        if (ns[i].value >= 2) {
            resultword.push(ns[i].name);
        }
    }
    for (let i = 0; i < ft.length; i++) {
        if (ft[i].value >= 2) {
            resultword.push(ft[i].name);
        }
    }
    for (let i = 0; i < pj.length; i++) {
        if (pj[i].value >= 2) {
            resultword.push(pj[i].name);
        }
    }
    const mbti = resultword.join().replace(',','').replace(',','').replace(',','');
    goMbtiresult(mbti);
}

function goResult(){
    qna.style.display = "none";
    result.style.display = "block";
    calResult();
}


function addAnswer(answerText, qIdx, idx){
    let a = document.querySelector('.aBox');
    let answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-1');
    answer.classList.add('mx-auto');
    a.appendChild(answer);
    answer.innerHTML = answerText;
    answer.addEventListener("click", function(){
        let children = document.querySelectorAll('.answerList')
        select[qIdx] = idx;
        for (let i = 0; i < children.length; i++) {
            children[i].disabled = true;
            children[i].style.display = 'none';
        }
        goNext(++qIdx);
    }, false);
}

function goNext(qIdx){
    if (qIdx === endPoint) {
        goResult();
    } else {
        let q = document.querySelector('.qBox');
        q.innerHTML = qnaList[qIdx].q;
        for(let i in qnaList[qIdx].a){
            addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
        }
        let status = document.querySelector('.statusBar');
        status.style.width = (100/endPoint) * (qIdx+1) + '%';
    }
  }

function begin(){
    main.style.display = "none";
    qna.style.display = "block";
    let qIdx = 0;
    goNext(qIdx);
}