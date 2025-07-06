def cifrar_cesar(texto, desplazamiento):
    resultado = ""
    for char in texto:
        if char.isupper():
            resultado += chr((ord(char) - 65 + desplazamiento) % 26 + 65)
        elif char.islower():
            resultado += chr((ord(char) - 97 + desplazamiento) % 26 + 97)
        else:
            resultado += char
    return resultado

def descifrar_cesar(texto, desplazamiento):
    return cifrar_cesar(texto, -desplazamiento)