/* Helpers locales — SOLO copia local. No forma parte del sitio original.
   - El bundle trae window.__MODO_LIBRE = true: cualquier código, bitácora o
     respuesta se acepta como válida.
   - Botón flotante para reiniciar el progreso, y "🚀 Todo desbloqueado". */
(function () {
  function reiniciar() {
    if (!confirm("¿Borrar el progreso guardado y empezar desde cero?")) return;
    try {
      localStorage.removeItem("paipa_expedicion_v2");
      localStorage.removeItem("paipa_token");
      localStorage.removeItem("paipa_sid");
    } catch (e) {}
    location.reload();
  }
  window.reiniciarJuego = reiniciar;

  function desbloquearTodo() {
    if (typeof window.__desbloquearTodo === "function") {
      window.__desbloquearTodo();
      location.reload(); // refresca HUD, fragmentos y candados del mapa
    } else {
      alert("El juego aún no ha terminado de cargar; espera un segundo e inténtalo de nuevo.");
    }
  }
  window.desbloquearTodo = desbloquearTodo;

  function boton(texto, titulo, onclick, bottom) {
    var b = document.createElement("button");
    b.textContent = texto;
    b.title = titulo;
    b.onclick = onclick;
    b.style.cssText = "position:fixed;right:12px;bottom:" + bottom + "px;z-index:99999;cursor:pointer;" +
      "padding:8px 12px;border-radius:8px;border:1px solid #444;background:#333d;" +
      "color:#fff;font:600 12px system-ui;box-shadow:0 2px 10px #0006";
    document.body.appendChild(b);
    return b;
  }

  window.addEventListener("DOMContentLoaded", function () {
    boton("↺ Reiniciar progreso", "Borra el avance guardado en este navegador y empieza de cero", reiniciar, 12);
    boton("🚀 Todo desbloqueado", "Marca todos los mundos y fragmentos como completados", desbloquearTodo, 52);
    console.log("[dev-unlock] modo libre:", window.__MODO_LIBRE === true);
  });
})();
