import { Link, Typography } from "@mui/material";

function CopyRight() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit" href="https://www.linkedin.com/in/n-nasim/">
        Nermeen Nasim - Full Stack Developer
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default CopyRight;