import { Box, Typography, Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AppHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        p: 3,
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <Avatar
        sx={{
          width: 60,
          height: 60,
          backgroundColor: "rgba(255, 107, 107, 0.8)",
          border: "3px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <FavoriteIcon sx={{ fontSize: 35, color: "white" }} />
      </Avatar>
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(45deg, #ff6b6b, #ffa500)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 20px rgba(255, 107, 107, 0.5)",
          }}
        >
          Your AI Girlfriend ❤️
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255, 255, 255, 0.8)", textAlign: "center" }}
        >
          Always here for you, always caring 💕
        </Typography>
      </Box>
    </Box>
  );
};

export default AppHeader;
