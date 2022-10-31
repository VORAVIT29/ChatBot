import pyttsx3
import speech_recognition as sr


def assistant(audio):
    engine = pyttsx3.init()
    TH_voice_id = "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\TTS_THAI"
    voices = engine.getProperty('voices')
    engine.setProperty('volume', 0.9)  # Volume 0-1
    engine.setProperty('rate', 120)  # 148
    engine.setProperty('voice', TH_voice_id)
    engine.say(audio)
    engine.runAndWait()
    return


def input():
    aud = sr.Recognizer()
    with sr.Microphone() as source:
        # print('listening and processing')
        aud.pause_threshold = 0.7
        audio = aud.listen(source)
        try:
            # print("understanding")
            phrase = aud.recognize_google(audio, language='th')
            # print("you said: ", phrase)
        except Exception as exp:
            # print(exp)
            # print("Can you please repeat that")
            return "None"
        return phrase
