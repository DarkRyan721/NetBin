import speech_recognition as sr

# Configuración de reconocimiento de voz
recognizer = sr.Recognizer()
mic = sr.Microphone()

def leer_microfono():
    """Función para leer el audio del micrófono y convertirlo en texto."""
    with mic as source:
        print("Microfono abierto")
        audio = recognizer.listen(source, phrase_time_limit=5)
        print("¡Te escuché!")

    try:
        texto = recognizer.recognize_google(audio, language="ES")
        print(texto)
        return texto
    except sr.UnknownValueError:
        print("No se entendió.")
        return "-"
    except sr.RequestError as e:
        print("Error con Google Speech Recognition")
    return None
