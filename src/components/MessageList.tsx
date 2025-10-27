import {
  Box,
  Paper,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { Message } from "../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageList = ({ messages, isLoading }: MessageListProps) => {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(255, 107, 107, 0.5)",
          borderRadius: "10px",
          "&:hover": {
            background: "rgba(255, 107, 107, 0.7)",
          },
        },
      }}
    >
      {messages.map((message, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: message.isUser ? "flex-end" : "flex-start",
            animation: "slideIn 0.3s ease-out",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              flexDirection: message.isUser ? "row-reverse" : "row",
              maxWidth: "70%",
            }}
          >
            {!message.isUser && (
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: "rgba(255, 107, 107, 0.8)",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                <FavoriteIcon sx={{ fontSize: 20 }} />
              </Avatar>
            )}
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 3,
                background: message.isUser
                  ? "linear-gradient(135deg, #ff6b6b, #ff8e53)"
                  : "rgba(255, 255, 255, 0.95)",
                color: message.isUser ? "white" : "#333",
                maxWidth: "100%",
                wordWrap: "break-word",
                animation: "message-slide 0.3s ease-out",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                }}
              >
                {message.text}
              </Typography>
            </Paper>
          </Box>
        </Box>
      ))}

      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              backgroundColor: "rgba(255, 107, 107, 0.8)",
            }}
          >
            <FavoriteIcon sx={{ fontSize: 20 }} />
          </Avatar>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.95)",
            }}
          >
            <CircularProgress size={20} sx={{ color: "#ff6b6b" }} />
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default MessageList;
