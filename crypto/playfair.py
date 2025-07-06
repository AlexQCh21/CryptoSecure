import string

def limpiar_texto(texto):
    texto = texto.upper().replace('J', 'I')
    return ''.join(c for c in texto if c in string.ascii_uppercase)

def generar_matriz(clave):
    clave = limpiar_texto(clave)
    matriz = []
    usados = set()
    for c in clave:
        if c not in usados:
            matriz.append(c)
            usados.add(c)
    for c in string.ascii_uppercase:
        if c == 'J':
            continue
        if c not in usados:
            matriz.append(c)
            usados.add(c)
    return [matriz[i*5:(i+1)*5] for i in range(5)]

def preparar_pares(texto):
    texto = limpiar_texto(texto)
    pares = []
    i = 0
    while i < len(texto):
        a = texto[i]
        b = texto[i+1] if i+1 < len(texto) else 'X'
        if a == b:
            pares.append((a, 'X'))
            i += 1
        else:
            pares.append((a, b))
            i += 2
    return pares

def buscar_posicion(matriz, letra):
    for i, fila in enumerate(matriz):
        for j, c in enumerate(fila):
            if c == letra:
                return i, j
    return None

def cifrar_pareja(a, b, matriz):
    ra, ca = buscar_posicion(matriz, a)
    rb, cb = buscar_posicion(matriz, b)
    if ra == rb:
        return matriz[ra][(ca+1)%5] + matriz[rb][(cb+1)%5]
    elif ca == cb:
        return matriz[(ra+1)%5][ca] + matriz[(rb+1)%5][cb]
    else:
        return matriz[ra][cb] + matriz[rb][ca]

def descifrar_pareja(a, b, matriz):
    ra, ca = buscar_posicion(matriz, a)
    rb, cb = buscar_posicion(matriz, b)
    if ra == rb:
        return matriz[ra][(ca-1)%5] + matriz[rb][(cb-1)%5]
    elif ca == cb:
        return matriz[(ra-1)%5][ca] + matriz[(rb-1)%5][cb]
    else:
        return matriz[ra][cb] + matriz[rb][ca]

def cifrar_playfair(texto, clave):
    matriz = generar_matriz(clave)
    pares = preparar_pares(texto)
    resultado = ''
    for a, b in pares:
        resultado += cifrar_pareja(a, b, matriz)
    return resultado

def descifrar_playfair(texto, clave):
    matriz = generar_matriz(clave)
    pares = preparar_pares(texto)
    resultado = ''
    for a, b in pares:
        resultado += descifrar_pareja(a, b, matriz)
    return resultado