const style = {
    userInput: {

    },
    sessionMessage: {
        container: {
            width: '100%',
        },
        header: {
            avatar: {
                width: 50,
                height: 50,
                alignSelf: {
                    xs: 'center',
                    sm: 'flex-start'
                },
            },
            icon: {
                minWidth: '40px',
                '&:hover': {
                    backgroundColor: 'rgba(255,100,100,0.2)'
                },
            },
        },
        content: {
            general: {
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
            },
            code: {
                backgroundColor: 'black',
                borderRadius: '5px',
            },
        },
        font: 'roboto',
    },
    header: {
        width: '100%',
        flexGrow: 0,
        minHeight: '7vh'
    },
    main: {
        display: 'flex',
        width: '100%',
        maxHeight: '93vh',
        flexGrow: 1,
        flexShrink: 0,
    },
    sessionsSection: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '93vh',
        width: '20%',
        flexGrow: 0,
        flexShrink: 0,
    },
    sessionContainer: {
        height: '93vh',
        width: '60%',
    },
    sessionMessageContainer: {
        flexGrow: 1,
        maxHeight: '48vh',
        overflowY: 'auto',
    },
    userInputContainer: {
        flexGrow: 1,
        maxHeight: '43vh',
        display: 'flex',
    },
    details:{
        minHeight :'93vh',
        flexGrow :1,
        flexShrink :0,
    },
};

export default style;