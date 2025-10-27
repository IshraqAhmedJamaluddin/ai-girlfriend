import { useState, useEffect, useRef } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Fade,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AppHeader from "./components/AppHeader";
import MessageList from "./components/MessageList";
import { Message } from "./types";
import { sendMessageToAI } from "./services/geminiService";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff1744",
      light: "#ff5252",
      dark: "#c51162",
    },
    secondary: {
      main: "#ff4081",
      light: "#ff79b0",
      dark: "#c60055",
    },
    background: {
      default: "#0a0e27",
      paper: "#151b3d",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! 💕 I'm your AI girlfriend. Let's chat and get to know each other! ❤️",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hearts, setHearts] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const heartCounter = useRef(0);

  useEffect(() => {
    // Add initial greeting hearts
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        setHearts((prev) => [
          ...prev,
          {
            id: heartCounter.current++,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          },
        ]);
      }, i * 500);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Add hearts when sending message
    const newHearts = Array.from({ length: 3 }, () => ({
      id: heartCounter.current++,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setHearts((prev) => [...prev, ...newHearts]);

    try {
      const response = await sendMessageToAI(input);
      const aiMessage: Message = {
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Add more hearts when receiving response
      const responseHearts = Array.from({ length: 5 }, () => ({
        id: heartCounter.current++,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }));
      setHearts((prev) => [...prev, ...responseHearts]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        text: "Sorry, I'm having trouble connecting right now. Please try again later. 💔",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating Hearts Background */}
        {hearts.map((heart, index) => (
          <Fade in key={heart.id} timeout={2000}>
            <FavoriteIcon
              className="heart-animation"
              sx={{
                position: "absolute",
                left: `${heart.x}px`,
                top: `${heart.y}px`,
                color: "rgba(255, 107, 107, 0.6)",
                fontSize: "2rem",
                animationDelay: `${index * 0.1}s`,
              }}
            />
          </Fade>
        ))}

        <AppHeader />

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            p: 2,
            position: "relative",
            zIndex: 1,
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          <MessageList messages={messages} isLoading={isLoading} />

          <Paper
            elevation={10}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 2,
              borderRadius: "25px",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              mt: 2,
            }}
          >
            <ChatBubbleOutlineIcon sx={{ color: "white", ml: 1 }} />
            <TextField
              fullWidth
              placeholder="Send a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              multiline
              maxRows={4}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgba(255, 107, 107, 1)",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255, 255, 255, 0.7)",
                  opacity: 1,
                },
              }}
            />
            <IconButton
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              sx={{
                backgroundColor: "rgba(255, 107, 107, 0.3)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 107, 107, 0.5)",
                },
                "&.Mui-disabled": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
