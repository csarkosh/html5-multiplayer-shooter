import React from "react"
import Game from "./game"
import hook, {Screen} from "./gbl-hook"


const canvas: React.RefObject<HTMLCanvasElement> = React.createRef()

// const launchGame = () => {
//     this.setMenu(Menu.NONE)
//     this.game = Game.create(this.canvas.current)
// }


export default function App() {
    const [screen, setScreen] = hook('screen')
    return (
        <>
            <canvas ref={canvas}>
                You need to use a browswer that supports HTML5 canvas to access this game.
            </canvas>
            <div
                id="menu"
                style={screen === Screen.GAME ? { display: 'none' } : undefined}
            >
                <div className="menu-content">
                    <div className="title-text">Shooter</div>
                    <>
                        <button
                            className="btn btn-light border shadow-sm d-block w-100 mt-2"
                            onClick={() => {
                                setScreen(Screen.GAME)
                                Game.create(canvas.current)
                            }}
                            type="button"
                        >
                            Singleplayer
                        </button>
                        <button
                            className="btn btn-light border shadow-sm d-block w-100 mt-2"
                            onClick={() => setScreen(Screen.LOBBY)}
                            type="button"
                        >
                            Multiplayer
                        </button>
                        <div className="mt-2 d-flex">
                            <button
                                className="btn btn-light border shadow-sm w-100 me-1"
                                onClick={() => setScreen(Screen.OPTIONS)}
                                type="button"
                            >
                                Options
                            </button>
                            <button
                                className="btn btn-light border shadow-sm w-100 ms-1"
                                onClick={() => setScreen(Screen.CREDITS)}
                                type="button"
                            >
                                Credits
                            </button>
                        </div>
                    </>
                </div>
            </div>
        </>
    )
}
