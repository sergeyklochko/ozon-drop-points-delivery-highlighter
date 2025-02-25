// Основная функция подсветки пунктов Ozon
const highlightOzonPoints = () => {
  const targets = document.querySelectorAll('section[data-widget="rfbsAddressInfo"]');
  let hasOzonPoint = false;

  // Подсвечиваем элементы с "Пункт Ozon"
  targets.forEach((element) => {
    if (element.textContent?.includes("Пункт Ozon")) {
      Object.assign(element.style, {
        border: "1px solid #f91155",
        backgroundColor: "#ffefef",
      });
      hasOzonPoint = true;
    }
  });

  // Если найден "Пункт Ozon", меняем синий на красный
  if (hasOzonPoint) {
    const targetSections = document.querySelectorAll('section[data-widget="total"], section[data-widget="rfbsAddressInfo"]');
    targetSections.forEach((section) => {
      // Ищем все элементы внутри секции
      section.querySelectorAll("*").forEach((el) => {
        const style = getComputedStyle(el);
        if (style.color === "rgb(0, 91, 255)") {
          el.style.color = "#e53535";
        }
        if (style.backgroundColor === "rgb(0, 91, 255)") {
          el.style.backgroundColor = "#e53535";
        }
      });
    });
  }
};

// Запуск только на Ozon с наблюдением за DOM
const init = () => {
  if (!window.location.hostname.includes("ozon.ru")) return;

  highlightOzonPoints();
  const observer = new MutationObserver(highlightOzonPoints);
  observer.observe(document.body, { childList: true, subtree: true });
};

// Запуск с небольшой задержкой для динамических страниц
setTimeout(init, 100);