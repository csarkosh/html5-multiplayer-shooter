import React, {RefObject} from "react"
import {
    Engine,
    FreeCamera,
    HemisphericLight,
    Mesh,
    Scene,
    Vector3,
} from 'babylonjs'

export default class App extends React.Component {
    canvas: RefObject<HTMLCanvasElement> = React.createRef()

    componentDidMount() {
        const engine: Engine = new Engine(this.canvas.current, true, {
            preserveDrawingBuffer: true,
            stencil: true
        })
        const scene: Scene = new Scene(engine)
        const camera: FreeCamera = new FreeCamera('user-camera', new Vector3(0, 5, -10), scene)
        scene.render()
    }

    render() {
        return (
            <React.Fragment>
                <canvas ref={this.canvas}>
                    You need to use a browswer that supports HTML5 canvas to access this game.
                </canvas>
                <div id="menu">
                    <div className="menu-content">
                        <div className="title-text">Shooter</div>
                        <button type="button" className="btn btn-light border shadow-sm d-block w-100 mt-2">Singleplayer</button>
                        <button type="button" className="btn btn-light border shadow-sm d-block w-100 mt-2">Multiplayer</button>
                        <div className="mt-2 d-flex">
                            <button type="button" className="btn btn-light border shadow-sm w-100 me-1">Options</button>
                            <button type="button" className="btn btn-light border shadow-sm w-100 ms-1">Credits</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
