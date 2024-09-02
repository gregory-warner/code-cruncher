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
};

export default style;