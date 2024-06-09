import { Avatar, Box, Typography, Grow } from '@mui/material';

const containerStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)"
};

const imageStyle = {
    height: "200px",
    width: "200px",
    animation: "spin 6s linear infinite, glow 3s linear infinite",
    "@keyframes spin": {
        "100%": {
            transform: "rotate(360deg)",
        },
        "0%": {
            transform: "rotate(0deg)",
        },
    },
    "@keyframes glow": {
        "0%": {
            boxShadow: "0 0 0 0 rgba(255, 255, 255, 0.8)"
        },
        "50%": {
            boxShadow: "0 0 20px 10px rgba(255, 255, 255, 0.8)"
        },
        "100%": {
            boxShadow: "0 0 0 0 rgba(255, 255, 255, 0.8)"
        },
    },
    opacity: "0.9",
};

const fontStyle = {
    animation: "glowEffect 3s ease-in-out infinite",
    "@keyframes glowEffect": {
        "0%": {
            textShadow: "0 0 5px rgba(255, 255, 255, 0.8)"
          },
          "50%": {
            textShadow: "0 0 20px rgba(255, 255, 255, 0.8)"
          },
          "100%": {
            textShadow: "0 0 5px rgba(255, 255, 255, 0.8)"
          },
    },
    position: "relative",
    display: "inline",
};

const ImageLoader = ({ imageLink }) => {

    return (
        <Box className={"container-style-dark"}>
            <Grow in>
                <Avatar sx={imageStyle} alt={`Image Loader`} src={imageLink} />
            </Grow>
            <Typography sx={fontStyle} variant={"h4"}>Loading...</Typography>
        </Box>
    );
};

export default ImageLoader;