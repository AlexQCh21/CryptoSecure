let metodoActual = 'md5';

document.querySelectorAll('.hash-btn-selector').forEach(btn => {
btn.addEventListener('click', () => {
    metodoActual = btn.dataset.algoritmo;
    document.getElementById('hash-title').textContent = `Hash ${metodoActual.toUpperCase()}`;
    document.getElementById('resultadohash').value = '';
    });
});


document.getElementById('btn-hash').addEventListener('click', async() => {
    const texto = document.getElementById('textoahash').value;
    const resultadoBox = document.getElementById('resultadohash');

    if (!texto){
        resultadoBox.value = 'Debe ingresar un texto. ';
        return;
    }

    resultadoBox.value = 'Calculando hash...';

    try{
        const response = await fetch('/api/hash', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({texto: texto, metodo: metodoActual})
        });
    const data = await response.json();
    if (response.ok && data.hash){
        resultadoBox.value = data.hash
    } else{
        resultadoBox.value = data.error || 'Error al calcular el hash';
    }
    
    }catch(err){
        resultadoBox.value = 'Error de conexión con el servidor';
    }
});

