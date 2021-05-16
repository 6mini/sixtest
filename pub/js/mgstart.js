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

function goMgresult(mg){
    if (mg.indexOf("big") > -1) {
        location.href = 'mg/big';//
    } else {
        if (mg.indexOf("6") > -1) {
            location.href = 'mg/dam';//
        } else {
            if (mg.indexOf("san") > -1) {
                if (mg.indexOf("ina") > -1) {
                    location.href = 'mg/gong';//
                } else {
                    location.href = 'mg/san';//
                }
            } else {
                if (mg.indexOf("s") > -1) {
                    if (mg.indexOf("kuku") > -1) {
                        location.href = 'mg/ku';//
                    }
                    if (mg.indexOf("niga") > -1) {
                     location.href = 'mg/ni';//
                    }
                } else {
                    if (mg.indexOf("eya") > -1) {
                        location.href = 'mg/gao';//
                    }
                    if (mg.indexOf("iya") > -1) {
                        location.href = 'mg/pie';//
                    }
                    if (mg.indexOf("ena") > -1) {
                        location.href = 'mg/non';//
                    }
                    if (mg.indexOf("ina") > -1) {
                        location.href = 'mg/ru';//
                    }  
                }
            }
        }
    }
}

function calResult(){
    let mgResult = '';
    for (let i = 0; i < endPoint; i++) {
        mgResult += qnaList[i].a[select[i]].type;        
    }
    goMgresult(mgResult);
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