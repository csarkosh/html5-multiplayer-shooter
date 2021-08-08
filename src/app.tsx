import React from 'react';
import { FreeCamera, Engine, Scene, Vector3 } from 'babylonjs'
import PlayersBox from "./PlayersBox";
import Title from "./title";


interface IAppProps {
}

interface IAppState {
}

class App extends React.Component<IAppProps, IAppState> {
    private canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef()
    private engine: Engine|null = null

    componentDidMount() {
        this.engine = new Engine(this.canvasRef.current, true, {
            preserveDrawingBuffer: true,
            stencil: true
        })
        const scene = new Scene(this.engine)
        new FreeCamera('cam1', new Vector3(0, 5, -10), scene)
        scene.render()
    }

    render() {
        return (
            <React.Fragment>
                <canvas
                    ref={this.canvasRef}
                    style={{
                        height: '100%',
                        outline: 'none',
                        position: 'fixed',
                        width: '100%',
                    }}
                >
                    Your browser does not support web games
                </canvas>
                <PlayersBox />
                <Title />
            </React.Fragment>
        )
    }
}

export default App;
