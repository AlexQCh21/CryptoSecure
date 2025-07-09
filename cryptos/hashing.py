import hashlib

def hash_md5(data) -> str:
    if isinstance(data, str):
        data = data.encode()
    return hashlib.md5(data).hexdigest()

def hash_sha1(data) -> str:
    if isinstance(data, str):
        data = data.encode()
    return hashlib.sha1(data).hexdigest()

def hash_sha224(data) -> str:
    if isinstance(data, str):
        data = data.encode()
    return hashlib.sha224(data).hexdigest()

def hash_sha256(data) -> str:
    if isinstance(data, str):
        data = data.encode()
    return hashlib.sha256(data).hexdigest()

def hash_sha384(data) -> str:
    if isinstance(data, str):
        data = data.encode()
    return hashlib.sha384(data).hexdigest()

def hash_sha512(data) -> str:
    if isinstance(data, str):
        data = data.encode()
    return hashlib.sha512(data).hexdigest()


mensaje = "hola mundo"
print("MD5:", hash_md5(mensaje))
print("SHA-256:", hash_sha256(mensaje))
