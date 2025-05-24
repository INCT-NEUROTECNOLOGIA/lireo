// main.jsx

// Imports primeiro
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// Script para lidar com redirecionamento do 404.html no GitHub Pages
// Este script roda uma vez quando main.jsx é carregado.
(function () {
  console.log('[SPA Redirect] Verificando sessionStorage.redirect...');
  const redirectData = sessionStorage.redirect; // Pega o caminho salvo pelo 404.html
  console.log('[SPA Redirect] Valor bruto de sessionStorage.redirect:', redirectData);

  if (redirectData) {
    console.log('[SPA Redirect] Dado "redirect" encontrado no sessionStorage:', redirectData);
    delete sessionStorage.redirect; // Limpa o valor para não usar de novo por engano
    console.log('[SPA Redirect] sessionStorage.redirect deletado.');

    const currentPathname = window.location.pathname; // Deverá ser "/lireo/" neste momento
    console.log('[SPA Redirect] window.location.pathname ATUAL:', currentPathname);

    // Seu basename é "/lireo/"
    const appBaseUrl = "/lireo/";

    // Remove uma possível barra inicial de redirectData, pois appBaseUrl já a terá
    const appSpecificPath = redirectData.startsWith('/') ? redirectData.substring(1) : redirectData;

    const newFullPath = appBaseUrl + appSpecificPath; // Ex: "/lireo/" + "sobre-nos" = "/lireo/sobre-nos"
    console.log('[SPA Redirect] Novo caminho completo calculado para history.replaceState:', newFullPath);

    if (newFullPath !== currentPathname) {
      console.log(`[SPA Redirect] Tentando history.replaceState para: ${newFullPath}`);
      // Muda a URL na barra de endereços SEM recarregar a página.
      // O BrowserRouter vai detectar essa mudança.
      history.replaceState(null, '', newFullPath);
      console.log('[SPA Redirect] history.replaceState chamado. Novo window.location.pathname DEVERIA SER:', window.location.pathname);
    } else {
      console.log('[SPA Redirect] Novo caminho calculado é o mesmo que o atual. Nenhuma ação de replaceState.');
    }
  } else {
    console.log('[SPA Redirect] Nenhum dado "redirect" no sessionStorage.');
  }
})();
// Fim do script de redirecionamento

// O resto da sua aplicação é inicializado DEPOIS que o script acima tentou corrigir a URL
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/lireo" >
      <App />
    </BrowserRouter>
  </StrictMode>
);