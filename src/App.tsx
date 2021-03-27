import React, {RefObject} from "react"
import { Engine, Scene } from 'babylonjs'

export default class App extends React.Component {
    canvas: RefObject<HTMLCanvasElement> = React.createRef()

    render() {
        return (
            <canvas
                ref={this.canvas}
            >
                You need to use a browswer that supports
                HTML5 canvas to access this game
            </canvas>
        )
    }
}
