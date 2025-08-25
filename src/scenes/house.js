import { generateOldManComponents } from "../entities/oldman.js";
import { generatePlayerComponents, setPlayerMovement } from "../entities/player.js";
import { colorizeBackground, drawBoundaries, drawTiles, fetchMapData } from "../utills.js";

export default async function house(k) {
    colorizeBackground(k, 27, 29, 52);

    const mapData = await fetchMapData("../assets/maps/house.json");

    const map = k.add([k.pos(520, 200)]);

    const entities = {
        player: null,
        oldman: null,
    };

    const layers = mapData.layers;
    for (const layer of layers) {
        if (layer.name === "Boundaries") {
            drawBoundaries(k, map, layer);
            continue;
        }
    
        if (layer.name === "SpawnPoints") {
            for (const object of layer.objects) {
                if (object.name === "player") {
                    entities.player = map.add(
                        generatePlayerComponents(k, k.vec2(object.x, object.y))
                    );
                }

                if (object.name === "oldman") {
                    entities.player = map.add(
                        generateOldManComponents(k, k.vec2(object.x, object.y))
                    );
                }
            }
            continue;
        }
            
        drawTiles(k, map, layer, mapData.tileheight, mapData.tilewidth);
    }

    k.camScale(3);

    setPlayerMovement(k, entities.player);

    entities.player.onCollide("door-exit", () => {
        k.go("world");
    });

    entities.player.onCollide("oldman", (oldman) => {
        console.log("Starting interaction with oldman");
        startInteraction(k, entities.oldman, entities.player);
    });
}