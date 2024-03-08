CSS.paintWorklet.addModule("./js/sketchy-arrow.js");

export function listenGroupFragment(nameFragment) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      const elements = document.querySelectorAll(
        `[group-fragment="${nameFragment}"]`
      );
      elements.forEach((el, index, nodeList) => {
        const ariaHidden = el.getAttribute("aria-hidden");
        if (index > 0) {
          nodeList[index - 1].style.display =
            ariaHidden === "false" ? "none" : "inherit";
        }
      });
    });
  });

  document
    .querySelectorAll(`[group-fragment="${nameFragment}"]`)
    .forEach((el) => {
      observer.observe(el, {
        attributes: true,
        attributeFilter: ["aria-hidden"],
      });
    });
}

export function listenSlideAutoplay(nameSlide, timing = 100) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const isVisibile =
        mutation.target.getAttribute("aria-hidden") === "false";
      if (!isVisibile) return;
      const elements = document.querySelectorAll(
        `[autoplay="${nameSlide}"] p-fragment:not([no-autoplay])`
      );
      elements.forEach((el, index) => {
        const ariaHidden = el.getAttribute("aria-hidden");
        if (ariaHidden === "true") {
          setTimeout(
            () => {
              el.setAttribute("aria-hidden", "false");
            },
            2000 + timing * index
          );
        }
      });
    });
  });

  document.querySelectorAll(`[autoplay="${nameSlide}"]`).forEach((el) => {
    observer.observe(el, {
      attributes: true,
      attributeFilter: ["aria-hidden"],
    });
  });
}

listenGroupFragment("project-structure");
listenSlideAutoplay("special-file");
listenSlideAutoplay("layout-hooks", 450);
