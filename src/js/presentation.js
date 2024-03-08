CSS.paintWorklet.addModule("./js/sketchy-arrow.js");

export function listenGroupFragment(nameFragment) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      const elements = document.querySelectorAll(
        '[group-fragment="project-structure"]'
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

listenGroupFragment("project-structure");
