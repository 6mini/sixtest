const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const endPoint = qnaList.length;
const result = document.querySelector("#result")
const select = [];
let resultword = [];

var copyBtn = document.getElementById("copyBtn");
            // 버튼 클릭 이벤트
            copyBtn.addEventListener("click", function(){
               // 복사할 텍스트를 변수에 할당해줍니다.
                var text = document.getElementById("textDiv").innerText;
                // input text 태그를 생성해줍니다.
                var createInput = document.createElement("input");
                createInput.setAttribute("type", "text");
                // 가상으로 가져올 태그에 만들어준 input 태그를 붙여줍니다.
                document.getElementById("textDiv").appendChild(createInput);
                // 만든 input 태그의 value 값에 복사할 텍스트 값을 넣어줍니다.
                createInput.value = text;
                // 복사 기능을 수행한 후
                createInput.select();
                document.execCommand('copy');
                // 가상으로 붙여주었던 input 태그를 제거해줍니다.
                document.getElementById("textDiv").removeChild(createInput);
                alert('복사가 완료되었습니다.');
            });

function goMbtiresult(mbti){
location.href='/job/'+mbti;
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
    const mbti = resultword.join();
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