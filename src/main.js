import k from "./kaboomContext.js";
import world from "./scenes/world.js";

k.loadSprite("assets", "../assets/topdownasset.png", {
    sliceX: 39,
    sliceY: 31,
    anims: {
        "player-idle-down": 936,
        "player-down": {
            from: 936,
            to: 939,
            loop: true,
        },
        "slime-idle-down": 858,
        "player-idle-side": 976,
        "player-side": {
            from: 976,
            to: 978,
            loop: true,
        },
        "player-idle-up": 1014,
        "player-up": {
            from: 1014,
            to: 1017,
            loop: true,
        },
    }
});

const scenes = {
    world,
}

for (const sceneName in scenes) {
    k.scene(sceneName, () => scenes[sceneName](k));
}

k.go("world");