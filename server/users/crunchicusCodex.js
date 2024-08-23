const actorName = "Crunchicus Codex";

const crunchicusCodex = {
    name: actorName,
    username: "crunchicus-codex",
    avatar: "codex.png",
    colorTheme: {
        messageCard: {
            borderRadius: "5px",
            border: "4px solid #ccc",
            transition: "all 0.3s ease-in-out",
            boxShadow: "",
            width: "100%",
            "&:hover": {
                boxShadow: "0px 0px 8px 3px rgba(255,255,0,0.5)",
                transform: "translateY(-5px)",
            },
            nameColor: "#01e400",
            contentsColor: "F5F5F5",
            backgroundColor: "#1C1C1C",
            borderColor: "#0f6303",
            textColor: "#1fcf06",
        },
    },
};

export default crunchicusCodex;