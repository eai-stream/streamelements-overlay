const name = "{{name}}";
document.querySelector("#username").innerHTML = stringToLetterHTML(name);

anime({
    targets: "#username .letter",
    scale: [0, 1],
    duration: 500,
    easing: "easeOutBack",
    delay: anime.stagger(50, { start: 250 }),
});

// 文字列を一文字ずつspanにバラす
function stringToLetterHTML(strings) {
    return Array.from(strings)
        .map((letter) => {
            return `<span class="letter">${letter}</span>`;
        })
        .join("");
}
