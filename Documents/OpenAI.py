from openai import OpenAI


def NetBin_AI(user_message=""):
    # Inicio de sesion por medio de la api_key
    client = OpenAI(api_key="${OPEN_AI_API_KEY}")

    # Se genera la conexion con la Inteligencia Artificial de Netbin
    NetBin_assistant = client.beta.assistants.retrieve("asst_wLne8wzEw7aJGzpMKUenbNR6")

    # Se crea un hilo/chat con la IA
    thread = client.beta.threads.create()

    # Se crea el mensaje, se le vincula a un chat, se da rol de usuario y se le anexa lo que dijo el usuario(proveniente del microfono)
    message = client.beta.threads.messages.create(
        thread_id=thread.id, role="user", content=user_message
    )

    # Se envia el mensaje a la IA(create and run) y se espera a que la IA responda(poll)
    run = client.beta.threads.runs.create_and_poll(
        thread_id=thread.id,
        assistant_id=NetBin_assistant.id,
    )

    # Verificar si el run ha sido completado o la IA ya respondio
    if run.status == "completed":
        # Obtener la lista de mensajes
        messages = client.beta.threads.messages.list(thread_id=thread.id)

        # Encontrar el último mensaje del asistente
        assistant_message = None
        for message in messages:
            if message.role == "assistant":
                assistant_message = message.content
                break

        # Imprimir la respuesta del asistente
        if assistant_message:
            client.beta.threads.delete(thread_id=thread.id)
            return assistant_message[0].text.value
        else:
            client.beta.threads.delete(thread_id=thread.id)
            return "Error en el mensaje"
    else:
        client.beta.threads.delete(thread_id=thread.id)
        return "Erro en el Run"


Respuesta_IA = NetBin_AI("Manzana dañada")

print(Respuesta_IA)
