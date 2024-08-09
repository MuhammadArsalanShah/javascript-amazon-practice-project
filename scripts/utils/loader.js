let loader;

export function showLoader() {
  loader = document.querySelector('#loader');
  loader.classList.remove('loader-hidden');
}

export function hideLoader(params) {
  let transitionCounter = 0;

  let transitionProp = window.getComputedStyle(loader , null)["transition-property"] || "";

  let numTransitionProps = transitionProp.split(",").length;

  loader = document.querySelector('#loader');
  loader.classList.add('loader-hidden');

  loader.addEventListener("transitionend", (event) => {
    if (transitionCounter < (numTransitionProps - 1)) {
      transitionCounter++;
    } else {
      transitionCounter = 0;
      document.body.removeChild(loader);
    }
  }, false);
}