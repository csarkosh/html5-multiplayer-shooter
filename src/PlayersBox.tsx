import React from 'react'
import {
    AddCircle,
    SignalCellular0Bar,
    SignalCellular1Bar,
    SignalCellular2Bar,
    SignalCellular3Bar,
    SignalCellular4Bar, Sync, Warning,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector } from "./state/store";
import { Button } from "@material-ui/core";
import { connect, Connection } from './state/wss'


const playerRowStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    signal: {
        color: 'grey',
        fontSize: 18,
        marginRight: 8,
        '& svg[data-conn="4"]': {
            color: 'green'
        },
        '& svg[data-conn="3"]': {
            color: 'greenyellow'
        },
        '& svg[data-conn="2"]': {
            color: 'yellow'
        },
        '& svg[data-conn="1"]': {
            color: 'red'
        },
    },
    tag: {
        color: 'red',
        fontWeight: 600,
        marginLeft: 4,
    }
})
interface IPlayerRowArgs {
    connStrength?: number,
    host?: boolean,
    name: string,
    self?: boolean,
}
const PlayerRow = ({ connStrength, name, self = false, host = false }: IPlayerRowArgs) => {
    const classes = playerRowStyles()
    const SignalCellular = connStrength === 4 ? (
        SignalCellular4Bar
    ) : connStrength === 3 ? (
        SignalCellular3Bar
    ) : connStrength === 2 ? (
        SignalCellular2Bar
    ) : connStrength === 1 ? (
        SignalCellular1Bar
    ) : (
        SignalCellular0Bar
    )
    return (
        <div className={classes.root}>
            <div className={classes.signal}>
                <SignalCellular data-conn={connStrength} fontSize="inherit" />
            </div>
            <div>
                {name}
            </div>
            {self && (
                <div className={classes.tag}>[you]</div>
            )}
            {host && (
                <div className={classes.tag}>[host]</div>
            )}
        </div>
    )
}

const multiplayerButtonStyles = makeStyles({
    wrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 0 8px',
    },
    root: {
        borderColor: 'white',
        color: 'white',
        fontSize: 16,
        padding: 0,
        textTransform: 'none',
        width: '100%',
        maxWidth: 'calc(100% - 8px)',
    },
    infoText: {
        fontSize: 13
    }
})
interface IMultiplayerButtonFC {
    disabled?: boolean,
    info?: string|React.ReactNode,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
    startIcon?: React.ReactNode
}
const MultiplayerButton: React.FC<IMultiplayerButtonFC> = ({
    children,
    disabled,
    info = '',
    onClick,
    startIcon,
})  => {
    const classes = multiplayerButtonStyles()
    return (
        <div className={classes.wrapper}>
            <span className={classes.infoText}>{info}</span>
            <Button
                className={classes.root}
                disabled={disabled}
                onClick={onClick}
                size="small"
                startIcon={startIcon}
                variant="outlined"
            >
                {children}
            </Button>
        </div>
    )
}

const InvitePlayerButton = ({disabled = false}) => (
    <MultiplayerButton
        disabled={disabled}
        startIcon={<AddCircle />}
    >
        Invite Player
    </MultiplayerButton>
)

const ReconnectButton = ({ disabled = false }) => (
    <MultiplayerButton
        disabled={disabled}
        info={
            <span style={{ color: '#FFD54F' }}>
                <Warning
                    fontSize="inherit"
                    style={{
                        marginBottom: -1,
                        marginRight: 4,
                    }}
                />
                You are offline
            </span>
        }
        onClick={connect}
        startIcon={<Sync />}
    >
        Reconnect
    </MultiplayerButton>
)

const playerBoxStyles = makeStyles({
    root: {
        bottom: 0,
        color: 'white',
        margin: '8px 4px',
        position: 'fixed',
        right: 0,
    },
    youTag: {
        color: 'red',
        fontWeight: 600,
    }
})
export default function PlayersBox() {
    const { players, playerIds } = useAppSelector(state => state.players)
    const { connected } = useAppSelector(state => state.wss)
    const classes = playerBoxStyles()
    return (
        <div className={classes.root}>
            {connected === Connection.CONNECTED ? (
                <InvitePlayerButton />
            ) : (
                <ReconnectButton />
            )}

            {playerIds.map(id => (
                <PlayerRow key={id} connStrength={3} name={players[id].name} />
            ))}
            <PlayerRow connStrength={0} name="Cyrus" self host />
        </div>
    )
}
