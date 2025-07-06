// document.addEventListener('DOMContentLoaded', function() {
//   const btnComprimir = document.getElementById('btn_comprimir');
//   const inputTexto = document.getElementById('ta_comprimir');
//   const resultadoBox = document.getElementById('ta_resultado');
//   const divArbol = document.getElementById('arbol_huffman');

//   if (btnComprimir && inputTexto && resultadoBox && divArbol) {
//     console.log("step 1..")
//     btnComprimir.addEventListener('click', async function() {
//       const texto = inputTexto.value;
//       resultadoBox.value = 'Comprimiendo...';
//       divArbol.innerHTML = '';
//       if (!texto.trim()) {
//         resultadoBox.value = 'Por favor ingresa el texto.';
//         return;
//       }
//       try {
//         const response = await fetch('/api/comprimir_huffman', {
//           method: 'POST',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({ texto: texto })
//         });
//         const data = await response.json();
//         if (response.ok) {
//           resultadoBox.value = data.comprimido;
//           // Mostrar árbol
//           divArbol.innerHTML = '';
//           if (data.arbol) {
//             divArbol.appendChild(renderHuffmanTree(data.arbol));
//           }
//         } else {
//           resultadoBox.value = data.error || 'Error al comprimir';
//         }
//       } catch (err) {
//         resultadoBox.value = 'Error de conexión o del servidor';
//       }
//     });
//   }

//   // Función para renderizar el árbol Huffman (simple, puedes mejorar visualmente)
//   function renderHuffmanTree(node) {
//     if (!node) return document.createTextNode('');
//     const el = document.createElement('div');
//     el.style.marginLeft = "10px";
//     if (node.char !== undefined) {
//       el.textContent = `"${node.char}": ${node.freq}`;
//     } else {
//       el.textContent = `[${node.freq}]`;
//       el.appendChild(document.createElement('br'));
//       const left = renderHuffmanTree(node.left);
//       left.style.display = "inline-block";
//       el.appendChild(left);
//       el.appendChild(document.createTextNode(' | '));
//       const right = renderHuffmanTree(node.right);
//       right.style.display = "inline-block";
//       el.appendChild(right);
//     }
//     return el;
//   }
// });

// document.addEventListener('DOMContentLoaded', function() {
//   const btnComprimir = document.getElementById('btn_comprimir');
//   const inputTexto = document.getElementById('ta_comprimir');
//   const resultadoBox = document.getElementById('ta_resultado');
//   const claveJsonBox = document.getElementById('ta_clave_json');
//   const divArbol = document.getElementById('arbol_huffman');

//   if (btnComprimir && inputTexto && resultadoBox && claveJsonBox && divArbol) {
//     btnComprimir.addEventListener('click', async function() {
//       const texto = inputTexto.value;
//       resultadoBox.value = 'Comprimiendo...';
//       claveJsonBox.value = '';
//       divArbol.innerHTML = '';
//       if (!texto.trim()) {
//         resultadoBox.value = 'Por favor ingresa el texto.';
//         return;
//       }
//       try {
//         const response = await fetch('/api/comprimir_huffman', {
//           method: 'POST',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({ texto: texto })
//         });
//         const data = await response.json();
//         if (response.ok) {
//           resultadoBox.value = data.comprimido;
//           claveJsonBox.value = JSON.stringify(data.codebook, null, 2);
//           divArbol.innerHTML = '';
//           if (data.arbol) {
//             divArbol.appendChild(drawHuffmanTree(data.arbol));
//           }
//         } else {
//           resultadoBox.value = data.error || 'Error al comprimir';
//         }
//       } catch (err) {
//         resultadoBox.value = 'Error de conexión o del servidor';
//       }
//     });
//   }

//   // Dibuja el árbol como un árbol binario visual (vertical)
//   function drawHuffmanTree(node) {
//     if (!node) return document.createTextNode('');
//     const wrapper = document.createElement('div');
//     wrapper.style.display = 'flex';
//     wrapper.style.flexDirection = 'column';
//     wrapper.style.alignItems = 'center';
//     wrapper.style.margin = '6px';

//     // Nodo visual
//     const nodeDiv = document.createElement('div');
//     nodeDiv.style.border = '1px solid #888';
//     nodeDiv.style.borderRadius = '8px';
//     nodeDiv.style.padding = '3px 8px';
//     nodeDiv.style.background = '#f6f8fa';
//     nodeDiv.style.margin = '4px';
//     nodeDiv.style.fontFamily = 'monospace';
//     nodeDiv.style.minWidth = '32px';
//     nodeDiv.style.textAlign = 'center';
//     if (node.char !== undefined) {
//       nodeDiv.textContent = `"${node.char}" (${node.freq})`;
//       nodeDiv.style.background = '#d1ffd6';
//       nodeDiv.style.fontWeight = 'bold';
//     } else {
//       nodeDiv.textContent = node.freq;
//       nodeDiv.style.background = '#f0f0f0';
//     }
//     wrapper.appendChild(nodeDiv);

//     // Hijos
//     if (node.left || node.right) {
//       const childrenWrapper = document.createElement('div');
//       childrenWrapper.style.display = 'flex';
//       childrenWrapper.style.justifyContent = 'center';
//       childrenWrapper.style.alignItems = 'flex-start';
//       childrenWrapper.style.marginTop = '2px';

//       // Líneas de conexión
//       const lineContainer = document.createElement('div');
//       lineContainer.style.display = 'flex';
//       lineContainer.style.justifyContent = 'center';
//       lineContainer.style.alignItems = 'center';
//       lineContainer.style.width = '100%';

//       if (node.left) {
//         const leftLine = document.createElement('div');
//         leftLine.style.width = '24px';
//         leftLine.style.height = '6px';
//         leftLine.style.borderBottom = '2px solid #888';
//         leftLine.style.borderLeft = '2px solid #888';
//         leftLine.style.marginRight = '2px';
//         lineContainer.appendChild(leftLine);
//       }

//       if (node.right) {
//         const rightLine = document.createElement('div');
//         rightLine.style.width = '24px';
//         rightLine.style.height = '6px';
//         rightLine.style.borderBottom = '2px solid #888';
//         rightLine.style.borderRight = '2px solid #888';
//         rightLine.style.marginLeft = '2px';
//         lineContainer.appendChild(rightLine);
//       }

//       wrapper.appendChild(lineContainer);

//       if (node.left) childrenWrapper.appendChild(drawHuffmanTree(node.left));
//       if (node.right) childrenWrapper.appendChild(drawHuffmanTree(node.right));
//       wrapper.appendChild(childrenWrapper);
//     }
//     return wrapper;
//   }
// });

document.addEventListener('DOMContentLoaded', function () {
    const btnComprimir = document.getElementById('btn_comprimir');
    const inputTexto = document.getElementById('ta_comprimir');
    const resultadoBox = document.getElementById('ta_resultado');
    const claveJsonBox = document.getElementById('ta_clave_json');
    const divArbol = document.getElementById('arbol_huffman');

    if (btnComprimir && inputTexto && resultadoBox && claveJsonBox && divArbol) {
        btnComprimir.addEventListener('click', async function () {
            const texto = inputTexto.value;
            resultadoBox.value = 'Comprimiendo...';
            claveJsonBox.value = '';
            divArbol.innerHTML = '';
            if (!texto.trim()) {
                resultadoBox.value = 'Por favor ingresa el texto.';
                return;
            }
            try {
                const response = await fetch('/api/comprimir_huffman', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ texto: texto })
                });
                const data = await response.json();
                if (response.ok) {
                    resultadoBox.value = data.comprimido;
                    claveJsonBox.value = JSON.stringify(data.codebook, null, 2);
                    divArbol.innerHTML = '';
                    if (data.arbol) {
                        divArbol.appendChild(drawHuffmanTree(data.arbol, ""));
                    }
                } else {
                    resultadoBox.value = data.error || 'Error al comprimir';
                }
            } catch (err) {
                resultadoBox.value = 'Error de conexión o del servidor';
            }
        });
    }

    // Dibuja el árbol Huffman, mostrando los valores y bits ("0"/"1") en las ramas
    function drawHuffmanTree(node, bit) {
        if (!node) return document.createTextNode('');

        // Contenedor principal del subárbol
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.alignItems = 'center';
        wrapper.style.margin = '8px';

        // Nodo visual
        const nodeDiv = document.createElement('div');
        nodeDiv.style.border = '2px solid #888';
        nodeDiv.style.borderRadius = '8px';
        nodeDiv.style.padding = '6px 14px';
        nodeDiv.style.background = node.char !== undefined ? '#d1ffd6' : '#f0f0f0';
        nodeDiv.style.fontFamily = 'monospace';
        nodeDiv.style.fontWeight = node.char !== undefined ? 'bold' : 'normal';
        nodeDiv.style.margin = '4px';
        nodeDiv.style.minWidth = '50px';
        nodeDiv.style.textAlign = 'center';
        // Cambia el color del texto a negro
        nodeDiv.style.color = '#000';

        if (node.char !== undefined) {
            nodeDiv.textContent = `"${node.char}" (${node.freq})`;
        } else {
            nodeDiv.textContent = node.freq;
        }

        // Si viene con bit ("0"/"1"), agrégalo arriba
        if (bit) {
            const bitDiv = document.createElement('div');
            bitDiv.textContent = bit;
            bitDiv.style.fontSize = '14px';
            bitDiv.style.marginBottom = '2px';
            bitDiv.style.color = '#fff';
            bitDiv.style.fontWeight = 'bold';
            wrapper.appendChild(bitDiv);
        }

        wrapper.appendChild(nodeDiv);

        // Hijos
        if (node.left || node.right) {
            const childrenWrapper = document.createElement('div');
            childrenWrapper.style.display = 'flex';
            childrenWrapper.style.justifyContent = 'center';
            childrenWrapper.style.alignItems = 'flex-start';
            childrenWrapper.style.marginTop = '0px';

            // Izquierda (bit 0)
            if (node.left) {
                const leftWrapper = drawHuffmanTree(node.left, "0");
                leftWrapper.style.marginRight = '18px';
                childrenWrapper.appendChild(leftWrapper);
            } else {
                // Espacio vacío para simetría si no hay hijo izquierdo
                const emptyDiv = document.createElement('div');
                emptyDiv.style.width = '50px';
                childrenWrapper.appendChild(emptyDiv);
            }
            // Derecha (bit 1)
            if (node.right) {
                const rightWrapper = drawHuffmanTree(node.right, "1");
                rightWrapper.style.marginLeft = '18px';
                childrenWrapper.appendChild(rightWrapper);
            }
            wrapper.appendChild(childrenWrapper);

            // Línea vertical entre nodo y sus hijos
            if (node.left || node.right) {
                nodeDiv.style.position = "relative";
                const line = document.createElement("div");
                line.style.height = "12px";
                line.style.width = "2px";
                line.style.background = "#888";
                line.style.position = "absolute";
                line.style.left = "50%";
                line.style.top = "100%";
                line.style.transform = "translateX(-50%)";
                nodeDiv.appendChild(line);
            }
        }
        return wrapper;
    }
});

// --- DESCOMPRIMIR HUFFMAN ---
document.addEventListener('DOMContentLoaded', function () {
    const btnDescomprimir = document.getElementById('btn_descomprimir');
    const taDescomprimir = document.getElementById('ta_descomprimir');
    const tbCodigosJson = document.getElementById('tb_codigos_json');
    // Busca el primer textarea vacío después del botón (donde va el resultado)
    const resultadoDescomp = btnDescomprimir 
        ? btnDescomprimir.nextElementSibling && btnDescomprimir.nextElementSibling.nextElementSibling
        : null;

    if (btnDescomprimir && taDescomprimir && tbCodigosJson && resultadoDescomp) {
        btnDescomprimir.addEventListener('click', async function () {
            const binario = taDescomprimir.value.trim();
            let codebook = {};
            resultadoDescomp.value = 'Descomprimiendo...';
            try {
                codebook = JSON.parse(tbCodigosJson.value);
            } catch (e) {
                resultadoDescomp.value = 'El JSON de la tabla de códigos es inválido.';
                return;
            }
            if (!binario || Object.keys(codebook).length === 0) {
                resultadoDescomp.value = 'Faltan datos para descomprimir.';
                return;
            }
            try {
                const response = await fetch('/api/descomprimir_huffman', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ binario, codebook })
                });
                const data = await response.json();
                if (response.ok) {
                    resultadoDescomp.value = data.resultado;
                } else {
                    resultadoDescomp.value = data.error || 'Error al descomprimir';
                }
            } catch (err) {
                resultadoDescomp.value = 'Error de conexión o del servidor';
            }
        });
    }
});