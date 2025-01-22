import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // To access the theme

const Contact = () => {
  const theme = useTheme(); // Access the theme
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.length > 150) {
      setError("Message cannot exceed 150 characters.");
      return;
    }

    const name = (event.target as any).elements.name.value;
    const email = (event.target as any).elements.email.value;

    // Email sending logic via mailto
    window.location.href = `mailto:nimmi24.1990@gmail.com?subject=Contact from Portfolio&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
  };

  return (
    <Container id="contact" sx={{ py: 5 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: theme.palette.text.primary }}
      >
        Contact Me
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 3,
          backgroundColor: theme.palette.background.paper,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{
            "& .MuiInputLabel-root": { color: theme.palette.text.secondary },
            "& .MuiOutlinedInput-root": {
              borderColor: theme.palette.divider,
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
              },
            },
            "& .MuiInputBase-input": { color: theme.palette.text.primary },
          }}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          variant="outlined"
          type="email"
          required
          sx={{
            "& .MuiInputLabel-root": { color: theme.palette.text.secondary },
            "& .MuiOutlinedInput-root": {
              borderColor: theme.palette.divider,
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
              },
            },
            "& .MuiInputBase-input": { color: theme.palette.text.primary },
          }}
        />
        <TextField
          label="Message"
          name="message"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          variant="outlined"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (e.target.value.length > 150) {
              setError("Message cannot exceed 150 characters.");
            } else {
              setError("");
            }
          }}
          sx={{
            "& .MuiInputLabel-root": { color: theme.palette.text.secondary },
            "& .MuiOutlinedInput-root": {
              borderColor: theme.palette.divider,
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
              },
            },
            "& .MuiInputBase-input": { color: theme.palette.text.primary },
          }}
        />
        {error && (
          <Typography
            color="error"
            variant="body2"
            sx={{ mt: 1, textAlign: "center" }}
          >
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={message.length > 150}
          sx={{
            mt: 2,
            backgroundColor: theme.palette.primary.main,
            "&:hover": { backgroundColor: theme.palette.primary.dark },
          }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default Contact;
