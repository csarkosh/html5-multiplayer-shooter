import { makeStyles } from '@material-ui/core/styles'


const fontSize = 100
const useStyles = makeStyles({
    //https://codepen.io/vlasterx/embed/zdNZZg
    h1: {
        color: '#FFF',
        backgroundColor: '#222',
        fontFamily: `'Saira', sans-serif`,
        fontWeight: 700,
        display: 'block',
        position: 'relative',
        fontSize,
        background: 'linear-gradient(to bottom,  #00f2ff 0%, #e2fbff 50%, #0a343f 51%, #0094f7 100%)',
        backgroundBlendMode: 'multiply',
        backgroundSize: `10px ${fontSize}x`,
        backgroundRepeat: 'repeat',
        lineHeight: 1,
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        '&::before': {
            background: 'none',
            content: 'attr(data-text)',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 2,
            backgroundImage: `url('https://i.imgur.com/Ym9HCsT.gif')`,
            backgroundBlendMode: 'screen',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
            opacity: 0.5,
        },
        '&::after': {
            background: 'none',
            content: 'attr(data-text)',
            position: 'absolute',
            left: 0,
            top: 0,
            textShadow: `1px -1px 0 rgba(255,255,255,0.5),
                3px 1px 3px rgba(255,0,255,0.85),
                -3px -2px 3px rgba(0,0,255,0.85),
                1px -2px 0 rgba(255,255,255,0.8)`,
            zIndex: '-2',
        }
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        margin: '24px 0 0',
        position: 'fixed',
        width: '100%',
    },
    by: {
        bottom: -12,
        color: 'white',
        fontFamily: 'Brush Script MT, Brush Script Std, cursive',
        fontSize: 54,
        margin: '-0.6em 0 0',
        position: 'absolute',
        right: -32,
        textShadow: '0 0 0.05em #fff, 0 0 0.2em #fe05e1, 0 0 0.3em #fe05e1',
        transform: 'rotate(-10deg)',
        zIndex: 3,
    },
})

const Title = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div style={{ position: 'relative', userSelect: 'none' }}>
                <div className={classes.h1} data-text="SHOOTER">
                    SHOOTER
                </div>
                <div className={classes.by}>By Cyrus</div>
            </div>
        </div>
    )
}

export default Title
