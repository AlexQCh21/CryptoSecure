document.addEventListener('DOMContentLoaded', function () {
  // Elementos
  const btnGenerarClaves = document.getElementById('generar_claves');
  const txtClavePublica = document.getElementById('clave_publica');
  const txtClavePrivada = document.getElementById('clave_privada');
  const btnUsarClavePublica = document.getElementById('usar_clave_publica');
  const txtClavePublicaUsar = document.getElementById('clave_publica_usar');
  const txtTextoCifrar = document.getElementById('texto_cifrar');
  const btnCifrarEnviar = document.getElementById('cifrar_texto_enviar');
  const txtMensajeCifrado = document.getElementById('mensaje_cifrado');
  const txtTextoCifradoADescifrar = document.getElementById('texto_cifrado_a_descifrar');
  const txtClavePrivadaAUsar = document.getElementById('clave_privada_a_usar');
  const btnDescifrar = document.getElementById('descifrar_text_con_clave_privada');
  const txtMensajeOriginal = document.getElementById('mensaje_original_descifrado');
  const registroLog = document.getElementById('registro_log');

  // Función para log
  function addLog(mensaje) {
    const fecha = new Date().toLocaleTimeString();
    registroLog.innerHTML = `<div>[${fecha}] ${mensaje}</div>` + registroLog.innerHTML;
  }

  let clavePrivadaGenerada = '';
  // 1. GENERAR CLAVES
  if (btnGenerarClaves) {
    btnGenerarClaves.addEventListener('click', async function () {
      addLog('Solicitando generación de claves...');
      try {
        const res = await fetch('/api/rsa/generar_claves', {method:'POST'});
        const data = await res.json();
        if (data.clave_publica && data.clave_privada) {
          txtClavePublica.value = data.clave_publica;
          txtClavePrivada.value = 'Clave privada generada con éxito';
          clavePrivadaGenerada = data.clave_privada;
          addLog('Claves generadas correctamente.');
        } else {
          addLog('Error: ' + (data.error || 'No se pudo generar las claves'));
        }
      } catch (e) {
        addLog('Error al conectar con el servidor.');
      }
    });
  }

  // 2. USAR CLAVE PUBLICA PARA CIFRAR
  if (btnUsarClavePublica) {
    btnUsarClavePublica.addEventListener('click', function () {
      txtClavePublicaUsar.value = txtClavePublica.value;
      addLog('Clave pública copiada para cifrado.');
    });
  }

  // 3. CIFRAR Y ENVIAR
  if (btnCifrarEnviar) {
    btnCifrarEnviar.addEventListener('click', async function () {
      const mensaje = txtTextoCifrar.value;
      const clavePub = txtClavePublicaUsar.value;
      if (!mensaje || !clavePub) {
        addLog('Debe ingresar un mensaje y una clave pública.');
        return;
      }
      addLog('Cifrando mensaje...');
      try {
        const res = await fetch('/api/rsa/cifrar', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({texto: mensaje, clave_publica: clavePub})
        });
        const data = await res.json();
        if (data.cifrado) {
          txtMensajeCifrado.value = data.cifrado;
          txtTextoCifradoADescifrar.value = data.cifrado;
          txtClavePrivadaAUsar.value = txtClavePrivada.value;
          addLog('Mensaje cifrado y listo para descifrar.');
        } else {
          addLog('Error cifrando: ' + (data.error || ''));
        }
      } catch (e) {
        addLog('Error al conectar con el servidor (cifrado).');
      }
    });
  }

  // 4. DESCIFRAR MENSAJE
  if (btnDescifrar) {
    btnDescifrar.addEventListener('click', async function () {
      const cifrado = txtTextoCifradoADescifrar.value;
      const clavePriv = clavePrivadaGenerada;
      if (!cifrado || !clavePriv) {
        addLog('Debe ingresar el mensaje cifrado y su clave privada.');
        return;
      }
      addLog('Descifrando mensaje utilizando la clave pública de BOB...');
      try {
        const res = await fetch('/api/rsa/descifrar', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({cifrado: cifrado, clave_privada: clavePriv})
        });
        const data = await res.json();
        if (data.texto !== undefined) {
          txtMensajeOriginal.value = data.texto;
          addLog('Mensaje descifrado correctamente.');
        } else {
          addLog('Error descifrando: ' + (data.error || ''));
        }
      } catch (e) {
        addLog('Error al conectar con el servidor (descifrado).');
      }
    });
  }
});