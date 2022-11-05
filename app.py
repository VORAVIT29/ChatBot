import re
from flask import Flask, render_template, request
import chatbot_train_test.chatbot_test as chatbot_predict
import assistant
app = Flask(__name__)


@app.route('/')
def main():
    return render_template("index.html")


@app.route('/predict-chatbot', methods=['POST'])
def chatbot():
    text = request.form.get("text")
    return chatbot_predict.chat(text)


@app.route('/get-mricro-phone', methods=['POST'])
def mricro():
    return assistant.input()


@app.route('/open-voice', methods=['POST'])
def open_voice():
    text = request.form.get("text")
    return assistant.assistant(text)


if __name__ == '__main__':
    app.run(debug=False)
