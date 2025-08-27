async function displayLine(textContainer, line) {
    for (const char of line) {
        await new Promise((resolve) => {
            setTimeout(() => {
                textContainer.text += char;
                resolve();
            }, 10);
        });
    }
}

export async function dialog(k, pos, content) {
    const dialogBox = k.add([k.rect(800, 200), k.pos(pos), k.fixed()]);
    const textContainer = dialogBox.add([
        k.text("", { size: 32, width: 700, lineSpacing: 15 }),
        k.color(27, 29, 52),
        k.pos(20, 40),
        k.fixed(),
    ]);

    await displayLine(textContainer, content[0]);
}