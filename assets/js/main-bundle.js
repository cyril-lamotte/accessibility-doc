!function(){var t=document.querySelectorAll('.criteria-radio input[type="radio"]'),e=document.querySelector("form"),i=document.querySelectorAll(".hint");t.forEach((function(t){t.addEventListener("change",(function(){var r=t.getAttribute("id");i.forEach((function(t){var i=t.getAttribute("data-a11y-ref");t.classList.remove("is-visible"),e.classList.remove(i)})),document.querySelectorAll('.hint[data-a11y-ref="'.concat(r,'"]')).forEach((function(t){t.classList.add("is-visible"),e.classList.add(r)}))}))}))}();
//# sourceMappingURL=main-bundle.js.map