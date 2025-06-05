    document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let valido = true;
  
    // Limpia errores anteriores
    document.querySelectorAll(".error").forEach(e => e.textContent = "");
    document.querySelectorAll("input, select").forEach(e => e.classList.remove("invalido"));
  
    // Nombre
    const nombre = document.getElementById("nombre");
    if (!nombre.value.trim()) {
      mostrarError(nombre, "El nombre completo es requerido.");
      valido = false;
    } else {
    nombre.classList.add("valido");
    nombre.classList.remove("invalido");
    }
  
    // RUT
    const rut = document.getElementById("rut");
    if (!validarRut(rut.value)) {
      mostrarError(rut, "El RUT no es válido.");
      valido = false;
    } else {
    rut.classList.add("valido");
    rut.classList.remove("invalido");
    }
  
    // Fecha
    const fecha = document.getElementById("fecha");
    if (fecha.value && !/^\d{4}-\d{2}-\d{2}$/.test(fecha.value)) {
    mostrarError(fecha, "Formato de fecha inválido.");
    valido = false;
    } else {
    fecha.classList.add("valido");
    fecha.classList.remove("invalido");
    }
  
    // CV
    const cv = document.getElementById("cv");
    if (cv.files.length) {
      const archivo = cv.files[0].name;
      if (!archivo.endsWith(".pdf") && !archivo.endsWith(".docx")) {
        mostrarError(cv, "Solo se permite archivo .pdf o .docx");
        valido = false;
      }
    }
  
    // Email
    const email = document.getElementById("email");
    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      mostrarError(email, "Debe ingresar un correo válido.");
      valido = false;
    } else {
    email.classList.add("valido");
    email.classList.remove("invalido");
    }
    // Género
    const genero = document.getElementById("genero");
    if (!genero.value) {
    mostrarError(genero, "Debe seleccionar un género.");
    valido = false;
    } else {
    genero.classList.add("valido");
    genero.classList.remove("invalido");
    }
  
    // Contraseña
    const password = document.getElementById("password");
    const confirmar = document.getElementById("confirmar");
    if (!/^.*(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/.test(password.value)) {
      mostrarError(password, "Debe tener 1 mayúscula, 1 minúscula, 1 número y entre 6-12 caracteres.");
      valido = false;
    }
    if (password.value !== confirmar.value) {
      mostrarError(confirmar, "Las contraseñas no coinciden.");
      valido = false;
    }
  
    if (valido) {
      alert("Formulario enviado correctamente.");
      document.getElementById("registroForm").reset();
    }
  });
  
  function mostrarError(elemento, mensaje) {
  const errorSpan = elemento.parentElement.querySelector(".error");
  errorSpan.textContent = mensaje;
  elemento.classList.add("invalido");
  elemento.classList.remove("valido");
  }
  
  function resetearFormulario() {
    document.getElementById("registroForm").reset();
    document.querySelectorAll(".error").forEach(e => e.textContent = "");
    document.querySelectorAll("input, select").forEach(e => e.classList.remove("invalido"));
    e.classList.remove("valido");
  }
  
  // Función para validar RUT chileno
  function validarRut(rut) {
    rut = rut.replace(/[^0-9kK]/g, "").toUpperCase();
    if (rut.length < 8) return false;
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1);
  
    let suma = 0, multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo[i]) * multiplo;
      multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    const dvEsperado = 11 - (suma % 11);
    const dvFinal = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    return dv === dvFinal;
  }
  