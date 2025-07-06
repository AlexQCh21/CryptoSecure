def vigenere_encrypt(texto, clave):
    texto = texto.upper()
    clave = clave.upper()
    resultado = ""

    clave_repetida = (clave * ((len(texto) // len(clave)) + 1))[:len(texto)]

    for t_char, k_char in zip(texto, clave_repetida):
        if t_char.isalpha():
            cifrado = (ord(t_char) - ord('A') + ord(k_char) - ord('A')) % 26
            resultado += chr(cifrado + ord('A'))
        else:
            resultado += t_char  # mantener espacios u otros símbolos

    return resultado


def vigenere_decrypt(texto_cifrado, clave):
    texto_cifrado = texto_cifrado.upper()
    clave = clave.upper()
    resultado = ""

    clave_repetida = (clave * ((len(texto_cifrado) // len(clave)) + 1))[:len(texto_cifrado)]

    for c_char, k_char in zip(texto_cifrado, clave_repetida):
        if c_char.isalpha():
            descifrado = (ord(c_char) - ord(k_char) + 26) % 26
            resultado += chr(descifrado + ord('A'))
        else:
            resultado += c_char  # mantener símbolos

    return resultado

mensaje = "ATAQUE AL AMANECER"
clave = "CLAVE"

cifrado = vigenere_encrypt(mensaje, clave)
print("Cifrado: ", cifrado)

descifrado = vigenere_decrypt(cifrado, clave)
print("Descifrado: ", descifrado)