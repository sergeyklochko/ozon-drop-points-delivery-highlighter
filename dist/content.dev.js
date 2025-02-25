"use strict";

function highlightOzonPoints() {
  var elements = document.querySelectorAll('[data-widget="rfbsAddressInfo"]');
  var foundOzonPoint = false;
  elements.forEach(function (element) {
    var text = element.textContent || "";

    if (text.includes("Пункт Ozon")) {
      element.style.border = "1px solid red";
      element.style.backgroundColor = "#ffefef";
      foundOzonPoint = true;
    }
  }); // Если нашли "Пункт Ozon", заменяем #005bff на красный

  if (foundOzonPoint) {
    document.querySelectorAll("*").forEach(function (el) {
      var computedStyle = getComputedStyle(el);

      if (computedStyle.color === "rgb(0, 91, 255)") {
        el.style.color = "#e53535";
      }

      if (computedStyle.backgroundColor === "rgb(0, 91, 255)") {
        el.style.backgroundColor = "#e53535";
      }
    });
  }
} // Проверяем, что страница Ozon, прежде чем запускать скрипт


function runIfOzon() {
  if (window.location.hostname.includes("ozon.ru")) {
    highlightOzonPoints(); // Наблюдатель за изменениями в DOM (для динамических изменений)

    var observer = new MutationObserver(highlightOzonPoints);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
} // Запускаем с небольшой задержкой (некоторые сайты динамически меняют URL без перезагрузки)


setTimeout(runIfOzon, 100);