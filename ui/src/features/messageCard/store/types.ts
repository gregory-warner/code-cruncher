export const yellowGlow = "0px 0px 10px 3px rgba(255,255,0,0.5)";

export const defaultCardStyle: MessageCardStyle = {
    nameColor: "yellow",
    contentsColor: "black",
    backgroundColor: "#C1DFF0",
    borderColor: "#2D848A",
    borderRadius: "5px",
    border: "4px solid #ccc",
    transition: "all 0.3s ease-in-out",
    boxShadow: "",
    width: "100%",
    textColor: "black",
    "&:hover": {
        boxShadow: yellowGlow,
        transform: "translateY(-5px)",
    },
};