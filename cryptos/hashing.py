import hashlib

def hash_md5(texto: str) -> str:
    return hashlib.md5(texto.encode()).hexdigest()

def hash_sha1(texto: str) -> str:
    return hashlib.sha1(texto.encode()).hexdigest()

def hash_sha224(texto: str) -> str:
    return hashlib.sha224(texto.encode()).hexdigest()

def hash_sha256(texto: str) -> str:
    return hashlib.sha256(texto.encode()).hexdigest()

def hash_sha384(texto: str) -> str:
    return hashlib.sha384(texto.encode()).hexdigest()

def hash_sha512(texto: str) -> str:
    return hashlib.sha512(texto.encode()).hexdigest()

mensaje = "hola mundo"
print("MD5:", hash_md5(mensaje))
print("SHA-256:", hash_sha256(mensaje))
