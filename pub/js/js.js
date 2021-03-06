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
          resultTitle = "??????/????????????"
          resultExplain = "?????????????????? ?????? ?????? ?????? ?????? ??????! ????????? ????????? ?????? ??????????????? ??????????????? ????????? ??????????????? ???????????????. ????????????????????? ????????? ???????????? ????????? ?????? ??????????????????."
          resultCeleb = "????????? ???????????? ??? : ??????"
          break;
      case "simple_casual":
          resultTitle = "??????/????????????"
          resultExplain = "????????? ????????? ?????? ????????? ?????? ?????? ??????! ????????? ??????????????? ?????? ????????? ????????? ????????? ???????????????. ??????????????? ????????? ???????????? ???????????? ????????? ????????? ??????????????????."
          resultCeleb = "????????? ???????????? ??? : ?????????"
          break;
      case "street_hiphop":
          resultTitle = "?????????/?????????"
          resultExplain = "?????? ???????????? ???????????? ????????? ????????? ????????? ?????? ?????? ??????! ?????? ????????? ????????? ???????????? ????????? ????????? ???????????? ???????????????. ?????????????????? ???????????? ?????? ??? ????????????????"
          resultCeleb = "????????? ???????????? ??? : ?????????"
          break;
      case "girlish":
          resultTitle = "????????????"
          resultExplain = "?????? ????????? ??????????????? ?????? ?????? ??????! ????????? ????????? ??????????????? ????????? ???????????? ?????? ???????????????. ????????? ????????? ???????????? ???????????? ???????????? ????????? ??????????????????."
          resultCeleb = "????????? ???????????? ??? : ??????"
          break;
      case "unique_kitchi":
          resultTitle = "?????????/?????????"
          resultExplain = "????????? ????????? ????????? ??? ?????? ???????????? ???????????? ?????? ??????! ????????? ?????? ?????? ????????? ?????? ????????? ?????????! ?????? ????????? ????????? ????????? ?????? ??????????????? ??????????????????."
          resultCeleb = "????????? ???????????? ??? : ?????????"
          break;
      case "formal_classic":
          resultTitle = "??????/????????????"
          resultExplain = "???????????? ???????????? ?????? ?????? ??????! ????????? ???????????? ????????? ???????????? ???????????? ???????????????. ????????? ?????? ?????? ??????????????? ?????????????????? ?????? ??????????????????."
          resultCeleb = "????????? ???????????? ??? : ??????"
          break;
      case "work_military":
          resultTitle = "??????/???????????????"
          resultExplain = "????????? ?????????????????????, ?????? ???????????? ?????? ???????????? ??????????????? ??????/?????????????????? ?????? ??????! ?????????????????? ??????????????? ???????????? ???????????????."
          resultCeleb = "????????? ???????????? ??? : ??????"
          break;
      default:
          resultTitle = "????????????"
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
                        labelTitle = "??????/????????????"
                        break;
                    case "simple_casual":
                        labelTitle = "??????/????????????"
                        break;
                    case "street_hiphop":
                        labelTitle = "?????????/?????????"
                        break;
                    case "girlish":
                        labelTitle = "????????????"
                        break;
                    case "unique_kitchi":
                        labelTitle = "?????????/?????????"
                        break;
                    case "formal_classic":
                        labelTitle = "??????/????????????"
                        break;
                    case "work_military":
                        labelTitle = "??????/???????????????"
                        break;
                    default:
                        labelTitle = "????????????"
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