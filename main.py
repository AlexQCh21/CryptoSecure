from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from cryptos.des import cifrar_DES, descifrar_DES
from cryptos.cesar import cifrar_cesar, descifrar_cesar
from cryptos.playfair import cifrar_playfair, descifrar_playfair
from cryptos.huffman import compress as huffman_compress, decompress as huffman_decompress, tree_to_dict
from cryptos.rsa import generar_claves, cifrar as rsa_cifrar, descifrar as rsa_descifrar


app = Flask(__name__)
CORS(app)



@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/RSA')
def show_rsa():
    return render_template('RSA.html')

@app.route('/huffman')
def show_huffman():
    return render_template('huffman.html')

@app.route('/cesar')
def show_cesar():
    return render_template('cesar.html')

@app.route('/vigenere')
def show_vigenere():
    return render_template('vigenere.html')

@app.route('/playfair')
def show_playfair():
    return render_template('playfair.html')

@app.route('/des')
def show_des():
    return render_template('des.html')

# Metodos de cifrado y descifrado
# DES - cifrado
@app.route('/api/cifrar_des', methods=['POST'])
def api_cifrar_des():
    data = request.get_json()
    texto = data.get('texto', '')
    clave = data.get('clave', '')
    if len(clave) != 8:
        return jsonify({'error': 'La clave debe tener exactamente 8 caracteres'}), 400
    try:
        resultado = cifrar_DES(texto, clave)
        return jsonify({'resultado': resultado})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# NUEVO: Endpoint para descifrado DES
@app.route('/api/descifrar_des', methods=['POST'])
def api_descifrar_des():
    data = request.get_json()
    texto = data.get('texto', '')
    clave = data.get('clave', '')
    if len(clave) != 8:
        return jsonify({'error': 'La clave debe tener exactamente 8 caracteres'}), 400
    try:
        resultado = descifrar_DES(texto, clave)
        return jsonify({'resultado': resultado})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# CESAR
# César - cifrado
@app.route('/api/cifrar_cesar', methods=['POST'])
def api_cifrar_cesar():
    data = request.get_json()
    texto = data.get('texto', '')
    try:
        desplazamiento = int(data.get('desplazamiento', 0))
    except:
        return jsonify({'error': 'El desplazamiento debe ser un número entero'}), 400

    try:
        resultado = cifrar_cesar(texto, desplazamiento)
        return jsonify({'resultado': resultado})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# César - descifrado
@app.route('/api/descifrar_cesar', methods=['POST'])
def api_descifrar_cesar():
    data = request.get_json()
    texto = data.get('texto', '')
    try:
        desplazamiento = int(data.get('desplazamiento', 0))
    except:
        return jsonify({'error': 'El desplazamiento debe ser un número entero'}), 400

    try:
        resultado = descifrar_cesar(texto, desplazamiento)
        return jsonify({'resultado': resultado})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# PLAYFAIR
# Playfair - cifrado
@app.route('/api/cifrar_playfair', methods=['POST'])
def api_cifrar_playfair():
    data = request.get_json()
    texto = data.get('texto', '')
    clave = data.get('clave', '')
    if not texto or not clave:
        return jsonify({'error': 'Texto y clave son requeridos'}), 400
    try:
        resultado = cifrar_playfair(texto, clave)
        return jsonify({'resultado': resultado})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# Playfair - descifrado
@app.route('/api/descifrar_playfair', methods=['POST'])
def api_descifrar_playfair():
    data = request.get_json()
    texto = data.get('texto', '')
    clave = data.get('clave', '')
    if not texto or not clave:
        return jsonify({'error': 'Texto y clave son requeridos'}), 400
    try:
        resultado = descifrar_playfair(texto, clave)
        return jsonify({'resultado': resultado})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

# HUFFMAN - comprimir
@app.route('/api/comprimir_huffman', methods=['POST'])
def api_comprimir_huffman():
    data = request.get_json()
    texto = data.get('texto', '')
    if not texto:
        return jsonify({'error': 'Texto requerido'}), 400
    try:
        comprimido, arbol, codebook = huffman_compress(texto)
        arbol_dict = tree_to_dict(arbol)
        # Asegúrate de que codebook es serializable (todos los valores string)
        codebook_str = {k: str(v) for k, v in codebook.items()}
        return jsonify({
            'comprimido': comprimido,
            'arbol': arbol_dict,
            'codebook': codebook_str
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# HUFFMAN - descomprimir (extra, por si lo necesitas)
@app.route('/api/descomprimir_huffman', methods=['POST'])
def api_descomprimir_huffman():
    data = request.get_json()
    binario = data.get('binario', '')
    codebook = data.get('codebook', {})
    try:
        resultado = huffman_decompress(binario, codebook)
        return jsonify({'resultado': resultado})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# RSA
# Generar claves RSA
@app.route('/api/rsa/generar_claves', methods=['POST'])
def api_generar_claves():
    try:
        clave_publica, clave_privada = generar_claves()
        return jsonify({'clave_publica': clave_publica, 'clave_privada': clave_privada})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Cifrar con clave pública
@app.route('/api/rsa/cifrar', methods=['POST'])
def api_rsa_cifrar():
    data = request.get_json()
    texto = data.get('texto', '')
    clave_publica = data.get('clave_publica', '')
    try:
        cifrado = rsa_cifrar(texto, clave_publica)
        return jsonify({'cifrado': cifrado})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Descifrar con clave privada
@app.route('/api/rsa/descifrar', methods=['POST'])
def api_rsa_descifrar():
    data = request.get_json()
    cifrado = data.get('cifrado', '')
    clave_privada = data.get('clave_privada', '')
    try:
        texto = rsa_descifrar(cifrado, clave_privada)
        return jsonify({'texto': texto})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__=='__main__':
    app.run(debug=True)