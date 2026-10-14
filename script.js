
// PEIXE NA REDE — interações do site

// IMPORTANTE:
// Confirme com a loja qual é o número de WhatsApp correto.
// O telefone abaixo foi divulgado para a unidade, mas precisa ser
// confirmado como WhatsApp antes de publicar o site.
const WHATSAPP_NUMBER = "5561991839382";

const WHATSAPP_MESSAGE =
  "Olá! Acessei o site do Peixe na Rede do ParkShopping e gostaria de mais informações.";

document.addEventListener("DOMContentLoaded", () => {
  // Configura todos os links que levam ao WhatsApp.
  const whatsappUrl =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  document.querySelectorAll(".whatsapp-link").forEach((link) => {
    link.href = whatsappUrl;
  });

  // Atualiza automaticamente o ano no rodapé.
  const year = document.getElementById("currentYear");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Seleciona os elementos do menu para celular.
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  // Abre e fecha o menu em telas menores.
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );
    });

    // Fecha o menu depois que uma seção é selecionada.
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
      });
    });
  }

  // Destaca no menu a seção que está sendo visualizada.
  const sections = document.querySelectorAll("main section[id]");
  const menuItems = document.querySelectorAll(".nav-links a");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            menuItems.forEach((item) => {
              item.classList.toggle(
                "active",
                item.getAttribute("href") === `#${entry.target.id}`
              );
            });
          }
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px"
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  }
});
