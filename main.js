function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500, 500);
    video.hide();
}

status = "";
object = [];
function preload() {
    sound = loadSound("siren.mp3");
 }

function draw() {
    image(video, 0, 0, 500, 500);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (index = 0; index < object.length; index++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("objNo").innerHTML = "Number of Objects Detected : " + object.length;
            percent = floor(object[index].confidence * 100);
            fill(r, g, b);
            text(object[index].label + " " + percent + "%", object[index].x + 10, object[index].y + 20);
            noFill();
            stroke(r, g, b);
            rect(object[index].x, object[index].y, object[index].width, object[index].height);
        }
    }
}

function modelLoaded() {
    console.log('model is loaded');
    status = true;
}

function gotResult(error, result) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(result);
        object = result;
        find = document.getElementById("Tinput").value;
        if(result[0].label == find) {
            sound.setVolume(0.001);
            sound.play();
        }else{
            sound.stop();
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting objects";
}