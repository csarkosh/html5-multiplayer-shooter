import {
    Engine,
    FreeCamera,
    HemisphericLight,
    Mesh,
    Scene,
    Vector3
} from "babylonjs";
import {Client as StompClient} from "@stomp/stompjs";

const myId = Math.floor(Math.random() * 1e9)

interface IPlayer {
    position: Vector3,
}

interface IState {
    keysDown: {[index: string]: boolean}
    playerIds: number[],
    players: {[index: number]: IPlayer},
}

const state: IState = {
    keysDown: {},
    playerIds: [myId],
    players: {
        [myId]: {
            position: new Vector3(0, 0.25, 8)
        }
    }
}

const createScene = (canvas: HTMLCanvasElement) => {
    const engine: Engine = new Engine(canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true
    })
    const scene: Scene = new Scene(engine)
    new FreeCamera('user-camera', new Vector3(0, 5, -10), scene)
    new HemisphericLight('light', Vector3.Up(), scene)
    const sphere = Mesh.CreateSphere('mysphere', 16, 1, scene, true, Mesh.FRONTSIDE)
    sphere.position = state.players[myId].position
    const ground = Mesh.CreateGround('ground', 10, 10, 2, scene, false)
    ground.position.z = 8
    scene.registerBeforeRender(() => {
        const { KeyW, KeyA, KeyS, KeyD } = state.keysDown
        const movement = new Vector3(
            (KeyD ? 1 : 0) - (KeyA ? 1 : 0),
            0,
            (KeyW ? 1 : 0) - (KeyS ? 1 : 0),
        ).normalize().scaleInPlace(engine.getDeltaTime() / 1000)
        state.players[myId].position.addInPlace(movement)
    })
    engine.runRenderLoop(() => {
        scene.render()
    })
}

export class CanvasElementNullError extends Error {
    constructor() {
        super("HTML Canvas element may not be null");
    }
}

export default class Game {
    static instance: Game
    static create = (canvas: HTMLCanvasElement|null): Game => {
        if (canvas === null) {
            throw new CanvasElementNullError()
        }
        if (Game.instance) {
            return Game.instance
        }
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            state.keysDown[e.code] = true
        })
        window.addEventListener('keyup', (e: KeyboardEvent) => {
            state.keysDown[e.code] = false
        })
        createScene(canvas)
        const stomp = new StompClient({
            brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 5000,
        })
        stomp.onConnect = () => {
            stomp.subscribe('/lobby/2', msg => {
                const body = JSON.parse(msg.body)
                console.log(body)
            })
        }
        stomp.activate()
        Game.instance = new Game()
        return Game.instance
    }

    private constructor() {}
}