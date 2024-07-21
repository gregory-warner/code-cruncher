const headerHeight = '5vh';
const mainHeight = '90v';
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
        border: '1px solid darkgray'
    },
    userInput: {
        height: '100%',
    },
    details: {
        height: mainHeight,
    },
    footer: {
        height: footerHeight,
    }
};

export default chatAppDesign;