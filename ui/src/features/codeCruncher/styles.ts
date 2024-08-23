const codeCruncherStyle = {
    header: {
        width: '100%',
        flexGrow: 0,
        minHeight: '7vh'
    },
    main: {
        display: 'flex',
        width: '100%',
        maxHeight: '90vh',
        flexGrow: 1,
        flexShrink: 0
    },
    sessionsSection: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '90vh',
        width: '30%',
        flexGrow: 0,
        flexShrink: 0
    },
    sessionContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '90vh',
        width: '60%',
        flexGrow: 0,
        flexShrink: 0
    },
    session: {
        overflowY: 'scroll',
        minHeight: '43%',
        border: '2px solid black'
    },
    userInput: {
    },
    details: {
        minHeight: '90vh',
        width: '30%',
        flexGrow: 0,
        flexShrink: 0
    },
    footer: {
        width: '100%',
        minHeight: '3vh'
    }
};


export default codeCruncherStyle;