(async () => {
  // widget params
  const o = {
    name: "{{name}}",
    audio: "{{audio}}",
  };
  document.querySelector("#username").innerHTML = stringToLetterHTML(o.name);

  const icon = await loadImage(
    `https://vercel-redirect-to.vercel.app/api?url=https://decapi.me/twitch/avatar/${o.name}`
  );
  document
    .querySelector(".image-container")
    .insertAdjacentElement("beforeend", icon);

  const audio = await loadAudio(o.audio);

  audio.play();
  document.querySelector(".container").style.animationPlayState = "running";
  anime({
    targets: "#username .letter",
    scale: [0, 1],
    duration: 500,
    easing: "easeOutBack",
    delay: anime.stagger(50, { start: 250 }),
  });
})();

// 文字列を一文字ずつspanにバラす
function stringToLetterHTML(strings) {
  return Array.from(strings)
    .map((letter) => {
      return `<span class="letter">${letter}</span>`;
    })
    .join("");
}

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

async function loadAudio(src, volume = 0.5) {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.volume = `{{customAudioVolume}}` || volume;
    audio.oncanplay = () => resolve(audio);
    audio.onerror = (e) => reject(e);
    audio.src = src;
  });
}
