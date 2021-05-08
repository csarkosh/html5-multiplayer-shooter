import React from "react"
import Game from "./game";

enum Menu {
    MAIN,
    NONE,
    OPTIONS,
    CREDITS,
    SINGLEPLAYER,
    MULTIPLAYER,
}

class App extends React.Component {
    private canvas: React.RefObject<HTMLCanvasElement> = React.createRef()
    private game: Game|null = null
    state = {
        menu: Menu.MAIN,
    }
    launchGame = () => {
        this.setMenu(Menu.NONE)
        this.game = Game.create(this.canvas.current)
    }
    setMenu = (menu: Menu) => this.setState({ menu })
    setMenuTransition = (menu: Menu) => () => this.setMenu(menu)
    render() {
        return (
            <React.Fragment>
                <canvas ref={this.canvas}>
                    You need to use a browswer that supports HTML5 canvas to access this game.
                </canvas>
                <div id="menu" style={this.state.menu === Menu.NONE ? { display: 'none' } : undefined}>
                    <div className="menu-content">
                        <div className="title-text">Shooter</div>
                        <React.Fragment>
                            <button
                                className="btn btn-light border shadow-sm d-block w-100 mt-2"
                                onClick={this.launchGame}
                                type="button"
                            >
                                Singleplayer
                            </button>
                            <button
                                className="btn btn-light border shadow-sm d-block w-100 mt-2"
                                onClick={this.launchGame}
                                type="button"
                            >
                                Multiplayer
                            </button>
                            <div className="mt-2 d-flex">
                                <button
                                    className="btn btn-light border shadow-sm w-100 me-1"
                                    onClick={this.setMenuTransition(Menu.OPTIONS)}
                                    type="button"
                                >
                                    Options
                                </button>
                                <button
                                    className="btn btn-light border shadow-sm w-100 ms-1"
                                    onClick={this.setMenuTransition(Menu.CREDITS)}
                                    type="button"
                                >
                                    Credits
                                </button>
                            </div>
                        </React.Fragment>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default App
