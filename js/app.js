let mouthOpenY = 0;
let targetMouthOpenY = 0;
let mouthOpenMax = 1;
let mouthOpenMin = 0;
let app = '';
let speaking = false;
let modelId = 0;
let model = '';
const model1Path = "https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/shizuku/shizuku.model.json";
const model2Path = "./hiyori_pro_zh/runtime/hiyori_pro_t11.model3.json";
const model3Path = "https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/haru/haru_greeter_t03.model3.json";
const model4Path = "./office_m/office_m.model3.json";
const model5Path = "./Test001/Nekome_BoyVTUBER.model3.json";
const model6Path = "./Test002/20230321.model3.json";

document.getElementById('mouthOpenMax').addEventListener("change", function() {
  document.getElementById('mouthOpenMax-text').innerHTML = document.getElementById('mouthOpenMax').value;
});
document.getElementById('mouthSpeed').addEventListener("change", function() {
  document.getElementById('mouthSpeed-text').innerHTML = document.getElementById('mouthSpeed').value;
});
document.getElementById('mouthOpenSize').addEventListener("change", function() {
  document.getElementById('mouthOpenSize-text').innerHTML = document.getElementById('mouthOpenSize').value;
});
document.getElementById('speakButton').addEventListener('click', function() {
  speak();
});

document.getElementById('selectModel').addEventListener("change", function() {
  console.log(document.getElementById('selectModel').value);
  changeModel(document.getElementById('selectModel').value);
});

(async function main() {
  app = new PIXI.Application({
    view: document.getElementById("canvas"),
    autoStart: true,
    width: 500,
    height: 500
  });

  createModel1();
})();

async function createModel1() {
  model = await PIXI.live2d.Live2DModel.from(model1Path);
  app.stage.addChild(model);
  model.scale.set(0.3);
  model.position.x = 50
  model.position.y = 50

  console.log(model);

  model.motion('tap_body');
}

async function createModel2() {
  model = await PIXI.live2d.Live2DModel.from(model2Path);
  app.stage.addChild(model);
  model.scale.set(0.3);
  model.position.x = - 180;
  model.position.y = - 50;

  console.log(model);
}

async function createModel3() {
  model = await PIXI.live2d.Live2DModel.from(model3Path);
  app.stage.addChild(model);
  model.scale.set(0.3);
  model.position.x = -100;

  console.log(model);
}

async function createModel4() {
  model = await PIXI.live2d.Live2DModel.from(model4Path);
  app.stage.addChild(model);
  model.scale.set(0.2);
  model.position.x = -125;
  model.position.y = 0;

  console.log(model);
}

async function createModel5() {
  model = await PIXI.live2d.Live2DModel.from(model5Path);
  app.stage.addChild(model);
  model.scale.set(0.3);
  model.position.x = -325;
  model.position.y = -150;

  console.log(model);
}

async function createModel6() {
  model = await PIXI.live2d.Live2DModel.from(model6Path);
  app.stage.addChild(model);
  model.scale.set(0.15);
  model.position.x = -100;
  model.position.y = -300;

  console.log(model);
}

function speak() {
  const textToSpeak = document.getElementById('textToSpeak').value;

  if (textToSpeak) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'zh-TW';
    utterance.onboundary = (event) => {
      targetMouthOpenY = 0.3 + (Math.random() * mouthOpenMax) * 0.7;
    };

    utterance.onstart = function(event) {
      console.log("语音合成已开始");
      speaking = true;
    };

    utterance.onend = function(event) {
      console.log("语音合成已结束");
      targetMouthOpenY = 0;
      speaking = false;
    };

    synth.speak(utterance);
  } else {
    alert('請輸入文字！');
  }
}

setMouthOpenY()
function setMouthOpenY() {
  let mouthSpeed = parseFloat(document.getElementById('mouthSpeed').value);
  let mouthOpenSize = parseFloat(document.getElementById('mouthOpenSize').value);
  mouthOpenMax = parseFloat(document.getElementById('mouthOpenMax').value);

  setTimeout(function(){
    setMouthOpenY();
  }, mouthSpeed);

  if (modelId > 1) {
    model.internalModel.motionManager.update = () => {
      model.internalModel.coreModel.setParameterValueById("ParamMouthOpenY", mouthOpenY);
    }
  } else {
    model.internalModel.motionManager.update = () => {
      model.internalModel.coreModel.setParamFloat('PARAM_MOUTH_OPEN_Y', mouthOpenY);
    }
  }

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

function changeModel(id) {
  modelId = id;
  app.stage.removeChildren();
  if (modelId == 1) {
    createModel1();
  } else if (modelId == 2) {
    createModel2();
  } else if (modelId == 3) {
    createModel3();
  } else if (modelId == 4) {
    createModel4();
  } else if (modelId == 5) {
    createModel5();
  } else if (modelId == 6) {
    createModel6();
  } else {
    createModel7();
  }
}