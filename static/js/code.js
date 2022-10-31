var checkOpenVoice;

// กำหนดค่าที่ Bot ตอบตอนแรก
setTimeout(function () {
    let messageContainer = document.querySelector(".chat-body");
    let messageText = `<div class='msg-img img-chatbot'></div>
                                    <div class='chatbot-message'>สวัสดี ฉันมะกรูด เป็นบอทของคุณ</div>`
    let div = document.createElement("div");
    div.setAttribute("class", "msg left-msg");
    div.innerHTML = messageText
    messageContainer.appendChild(div);
}, 1500)

// กดส่งข้อความ ปุ่ม send
let btnSend = document.querySelector('#send');
btnSend.onclick = function () {
    let text = document.getElementById('txtInput').value;
    let messageContainer = document.querySelector('.chat-body');
    createChatMessageUser(text, messageContainer);
    createChatMessageBot(text, messageContainer);
}
// ส่งข้อความ Enter
let enterText = document.querySelector('#txtInput');
enterText.addEventListener("keypress", function (event) {
    let text = document.getElementById('txtInput').value;
    let messageContainer = document.querySelector('.chat-body');
    if (event.key == "Enter") {
        createChatMessageUser(text, messageContainer);
        createChatMessageBot(text, messageContainer);
    }
})

// กดพูด
let mri = document.querySelector('#mri');
mri.onclick = function () {
    $.ajax({
        type: "post",
        url: "/get-mricro-phone",
        success: function (data) {
            if (data != "None") {
                document.getElementById('txtInput').value += data
            }
        }
    })
}

// user
function createChatMessageUser(text, messageContainer) {
    let messageText = `<div class='msg-img img-user'></div>
                                    <div class='user-message'>${text}</div>`
    let div = document.createElement("div");
    div.setAttribute("class", "msg right-msg");
    div.innerHTML = messageText;
    messageContainer.appendChild(div);
    document.getElementById('txtInput').value = ""
}

// chatbot
function createChatMessageBot(text, messageContainer) {
    // สร้าง class
    let div = document.createElement("div");
    div.setAttribute("class", "msg left-msg");
    let div2 = document.createElement("div");
    div2.setAttribute("class", "msg-img img-chatbot");
    div.appendChild(div2)
    let div3 = document.createElement("div");
    div3.setAttribute("class", "chatbot-message");
    div3.innerHTML = `<div class="load"></div>`
    div.appendChild(div3)
    messageContainer.appendChild(div);

    setTimeout(function () {
        $.ajax({
            type: "post",
            url: "/predict-chatbot",
            data: { "text": text },
            success: function (data) {
                div3.innerHTML = data
                // checkOpenVoice
                if (checkOpenVoice) openVoiceBot(data)
            }
        })
    }, 1500);
}



function openVoiceBot(message) {
    $.ajax({
        type: "post",
        url: "/open-voice",
        data: { "text": message },
        success: function (data) { }
    })
}

let btnVoiceEn = document.querySelector("#enable-voice");
btnVoiceEn.onclick = function () {
    document.getElementById("enable-voice").setAttribute("hidden", true);
    document.getElementById("disable-voice").removeAttribute("hidden");
    checkOpenVoice = document.getElementById("enable-voice").hidden;
}
let btnVoiceDis = document.querySelector("#disable-voice");
btnVoiceDis.onclick = function () {
    document.getElementById("disable-voice").setAttribute("hidden", true);
    document.getElementById("enable-voice").removeAttribute("hidden");
    checkOpenVoice = document.getElementById("enable-voice").hidden;
}