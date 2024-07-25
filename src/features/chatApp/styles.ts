const headerHeight = '3vh';
const mainHeight = '94vh';
const footerHeight = `calc(100vh - ${headerHeight} - ${mainHeight})`;

const chatAppDesign = {
    header: {
        minHeight: headerHeight,
    },
    main: {
        maxHeight: mainHeight,
    },
    session: {
        height: mainHeight,
    },
    conversationContainer: {
        maxHeight: mainHeight,
    },
    conversation: {
        overflowY: "scroll",
        maxHeight: '50vh',
        flexGrow: 1,
        border: '2px solid black'
    },
    userInput: {
        height: '100%',
        border: '2px solid black'
    },
    details: {
        height: mainHeight,
    },
    footer: {
        height: footerHeight,
    }
};

export default chatAppDesign;