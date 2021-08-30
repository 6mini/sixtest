function readURL(input) {
    if (input.files && input.files[0]) {
  
      var reader = new FileReader();
  
      reader.onload = function(e) {
        $('.image-upload-wrap').hide();
        $('#loading').show();
        $('.file-upload-image').attr('src', e.target.result);
        $('.file-upload-content').show();
  
        $('.image-title').html(input.files[0].name);
      };
  
      reader.readAsDataURL(input.files[0]);
      init().then(()=>{
        predict();
        $('#loading').hide();
      });
    } else {
      removeUpload();
    }
  }
  
  function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
  }
  $('.image-upload-wrap').bind('dragover', function () {
          $('.image-upload-wrap').addClass('image-dropping');
      });
      $('.image-upload-wrap').bind('dragleave', function () {
          $('.image-upload-wrap').removeClass('image-dropping');
  });
// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/zU_wz1qit/";

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();



    // append elements to the DOM
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}



// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    var image = document.getElementById("FasImg")
    const prediction = await model.predict(image, false);
    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    var resultTitle, resultExplain, resultCeleb;
    switch (prediction[0].className) {
      case "sexy_feminine":
          resultTitle = "섹시/페미닌룩"
          resultExplain = "여성스러움을 한껏 살린 룩을 입은 당신! 굴곡진 신체를 따라 자연스럽게 흘러내리는 선으로 아름다움을 표현했군요. 여성스러우면서 우아한 분위기를 풍기는 것이 특징이랍니다."
          resultCeleb = "강아지상 연예인: 강다니엘, 백현(엑소), 박보검, 송중기"
          break;
      case "simple_casual":
          resultTitle = "심플/캐쥬얼룩"
          resultExplain = "격식을 차리지 않은 노멀한 룩을 입은 당신! 간편한 스타일이나 기본 의류를 이용해 코디를 완성했군요. 가벼우면서 편하게 입었지만 스타일은 놓치지 않는게 특징이랍니다."
          resultCeleb = "고양이상 연예인: 황민현(뉴이스트), 시우민(엑소), 강동원, 이종석, 이준기"
          break;
      case "street_hiphop":
          resultTitle = "스트릿/힙합룩"
          resultExplain = "자기 개성대로 자유롭게 스트릿 문화에 기반한 룩을 입은 당신! 자주 변하는 유행을 중심으로 다양한 감성과 스타일을 표현했군요. 주변인들에게 힙하다는 소리 좀 듣겠는걸요?"
          resultCeleb = "토끼상 연예인: 정국(방탄소년단), 바비(아이콘), 박지훈(워너원), 수호(엑소)"
          break;
      case "girlish":
          resultTitle = "걸리시룩"
          resultExplain = "소녀 감성의 사랑스러운 룩을 입은 당신! 가벼운 컬러나 아기자기한 패턴을 사용하는 것이 특징입니다. 프레피 룩으로 대표되는 활동적인 아메리칸 캐주얼 스타일입니다."
          resultCeleb = "공룡상 연예인: 윤두준(하이라이트), 이민기, 김우빈, 육성재(비투비), 공유"
          break;
      case "unique_kitchi":
          resultTitle = "유니크/키치룩"
          resultExplain = "개성을 마음껏 표현할 수 있는 유니크한 키치룩을 입은 당신! 패션을 통해 자기 표현을 하는 모습이 멋져요! 튀고 싶거나 분위기 전환에 좋은 룩이라는게 특징이랍니다."
          resultCeleb = "곰상 연예인: 마동석, 조진웅, 조세호, 안재홍"
          break;
      case "formal_classic":
          resultTitle = "포멀/클래식룩"
          resultExplain = "깔끔하고 신사적인 룩을 입은 당신! 수트나 블레이저 등으로 포멀하게 스타일을 표현했군요. 유행을 타지 않고 고전적이고 전통적이라는 것이 특징이랍니다."
          resultCeleb = "곰상 연예인: 마동석, 조진웅, 조세호, 안재홍"
          break;
      case "work_military":
          resultTitle = "워크/밀리터리룩"
          resultExplain = "첫 인상은 무서워 보이지만 알고 보면 귀여운 매력의 당신! 꼼꼼하고 섬세한 성격으로 연인을 헌신적으로 챙겨주는 당신은 연인에게 듬직한 존재! 포근한 매력에 듬직함까지 갖춘 최고의 남자다!"
          resultCeleb = "곰상 연예인: 마동석, 조진웅, 조세호, 안재홍"
          break;
      default:
          resultTitle = "알수없음"
          resultExplain = ""
          resultCeleb = ""
    }
    var title = "<div class='result-title'>" + resultTitle + "</div>"
            var explain = "<div class='animal-explain pt-2'>" + resultExplain + "</div>"
            var celeb = "<div class='" + prediction[0].className + "-animal-celeb pt-2 pb-2'>" + resultCeleb + "</div>"
            $('.result-message').html(title + explain + celeb);
            var barWidth;
            for (let i = 0; i < maxPredictions; i++) {
                if (prediction[i].probability.toFixed(2) > 0.1) {
                    barWidth = Math.round(prediction[i].probability.toFixed(2) * 100) + "%";
                } else if (prediction[i].probability.toFixed(2) >= 0.01) {
                    barWidth = "4%"
                } else {
                    barWidth = "2%"
                }
                var labelTitle;
                switch (prediction[i].className) {
                    case "sexy_feminine":
                        labelTitle = "섹시/페미닌룩"
                        break;
                    case "simple_casual":
                        labelTitle = "심플/캐쥬얼룩"
                        break;
                    case "street_hiphop":
                        labelTitle = "스트릿/힙합룩"
                        break;
                    case "girlish":
                        labelTitle = "걸리시룩"
                        break;
                    case "unique_kitchi":
                        labelTitle = "유니크/키치룩"
                        break;
                    case "formal_classic":
                        labelTitle = "포멀/클래식룩"
                        break;
                    case "work_military":
                        labelTitle = "워크/밀리터리룩"
                        break;
                    default:
                        labelTitle = "알수없음"
                }
                var label = "<div class='animal-label d-flex align-items-center'>" + labelTitle + "</div>"
                var bar = "<div class='bar-container position-relative container'><div class='" + prediction[i].className + "-box'></div><div class='d-flex justify-content-center align-items-center " + prediction[i].className + "-bar' style='width: " + barWidth + "'><span class='d-block percent-text'>" + Math.round(prediction[i].probability.toFixed(2) * 100) + "%</span></div></div>"
                labelContainer.childNodes[i].innerHTML = label + bar;
    // for (let i = 0; i < maxPredictions; i++) {
    //     const classPrediction =
    //         prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    //     labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}