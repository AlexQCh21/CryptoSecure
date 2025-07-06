from Cryptodome.PublicKey import RSA
from Cryptodome.Cipher import PKCS1_OAEP
import base64

def generar_claves():
    key = RSA.generate(2048)
    clave_privada = key.export_key().decode()
    clave_publica = key.publickey().export_key().decode()
    return clave_publica, clave_privada

def cifrar(texto, clave_publica_str):
    key = RSA.import_key(clave_publica_str)
    cipher = PKCS1_OAEP.new(key)
    texto_bytes = texto.encode()
    cifrado_bytes = cipher.encrypt(texto_bytes)
    cifrado_b64 = base64.b64encode(cifrado_bytes).decode()
    return cifrado_b64

def descifrar(texto_cifrado_b64, clave_privada_str):
    key = RSA.import_key(clave_privada_str)
    cipher = PKCS1_OAEP.new(key)
    cifrado_bytes = base64.b64decode(texto_cifrado_b64)
    texto_bytes = cipher.decrypt(cifrado_bytes)
    return texto_bytes.decode()