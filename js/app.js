let mouthOpenY = 0;
let targetMouthOpenY = 0;
let mouthOpenMax = 1;
let mouthOpenMin = 0;

document.getElementById('mouthOpenMax').addEventListener("change", function() {
  document.getElementById('mouthOpenMax-text').innerHTML = document.getElementById('mouthOpenMax').value;
});

document.getElementById('mouthSpeed').addEventListener("change", function() {
  document.getElementById('mouthSpeed-text').innerHTML = document.getElementById('mouthSpeed').value;
});

document.getElementById('mouthOpenSize').addEventListener("change", function() {
  document.getElementById('mouthOpenSize-text').innerHTML = document.getElementById('mouthOpenSize').value;
});


const url = 'https://raw.githubusercontent.com/guansss/pixi-live2d-display/master/test/assets/shizuku/shizuku.model.json';
(async function main() {
  const app = new PIXI.Application({
    view: document.getElementById("canvas"),
    autoStart: true,
    width: 500,
    height: 600
  });

  const model = await PIXI.live2d.Live2DModel.from(url);
  app.stage.addChild(model);
  model.scale.set(0.4);

  console.log(model);

  const updateFn = model.internalModel.motionManager.update;

  model.internalModel.motionManager.update = () => {
    updateFn.call(model.internalModel.motionManager);
    model.internalModel.coreModel.setParamFloat('PARAM_MOUTH_OPEN_Y', mouthOpenY);
  }
})();

function speak() {
  const textToSpeak = document.getElementById('textToSpeak').value;

  if (textToSpeak) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    utterance.lang = 'zh-TW';

    // 监听朗读进度事件
    utterance.onboundary = (event) => {
      targetMouthOpenY = 0.3 + (Math.random() * mouthOpenMax) * 0.7;
    };

    utterance.onstart = function(event) {
      console.log("语音合成已开始");
    };

    utterance.onend = function(event) {
      console.log("语音合成已结束");
      targetMouthOpenY = 0;
    };

    synth.speak(utterance);
  } else {
    alert('請輸入文字！');
  }

}

document.getElementById('speakButton').addEventListener('click', function() {
  speak();
});

setMouthOpenY()
function setMouthOpenY() {
  let mouthSpeed = parseFloat(document.getElementById('mouthSpeed').value);
  let mouthOpenSize = parseFloat(document.getElementById('mouthOpenSize').value);
  mouthOpenMax = parseFloat(document.getElementById('mouthOpenMax').value);

  setTimeout(function(){
    setMouthOpenY();
  }, mouthSpeed);

  if (mouthOpenY > mouthOpenMax || mouthOpenY < 0) {
    return
  }

  if (targetMouthOpenY > mouthOpenY) {
    mouthOpenY = Math.min(mouthOpenMax, mouthOpenY + mouthOpenSize);
  }
  else {
    mouthOpenY = Math.max(0, mouthOpenY - mouthOpenSize);
  }
}