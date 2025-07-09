from Crypto.Cipher import DES
import base64

def pad(text):
    # DES requiere que la longitud sea múltiplo de 8
    while len(text) % 8 != 0:
        text += ' '
    return text

def cifrar_DES(texto, clave):
    clave = clave[:8]  # Solo los primeros 8 caracteres
    texto = pad(texto)
    des = DES.new(clave.encode('utf-8'), DES.MODE_ECB)
    texto_cifrado = des.encrypt(texto.encode('utf-8'))
    # Codificamos en base64 para devolverlo como texto legible
    return base64.b64encode(texto_cifrado).decode('utf-8')

def descifrar_DES(texto_cifrado_b64, clave):
    clave = clave[:8]
    des = DES.new(clave.encode('utf-8'), DES.MODE_ECB)
    try:
        datos_cifrados = base64.b64decode(texto_cifrado_b64)
        texto_descifrado = des.decrypt(datos_cifrados).decode('utf-8')
        # Quitar espacios de padding
        return texto_descifrado.rstrip()
    except Exception as e:
        raise ValueError("Error al descifrar: " + str(e))