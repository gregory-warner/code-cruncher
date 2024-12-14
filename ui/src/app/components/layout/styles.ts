const appStyle = {
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
    leftPanel: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '93vh',
        width: '20%',
        flexGrow: 0,
        flexShrink: 0,
    },
    centerPanel: {
        height: '93vh',
        width: '60%',
    },
    rightPanel:{
        maxHeight :'93vh',
        flexGrow :1,
        flexShrink :0,
    },
};


export default appStyle;