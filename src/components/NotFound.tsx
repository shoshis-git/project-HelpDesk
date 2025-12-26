import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 10,
        px: 2
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.main" }} />
      <Typography variant="h2" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Typography variant="body1" gutterBottom>
        It might have been removed, renamed, or never existed.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/dashboard"
        sx={{ mt: 3 }}
      >
        Back to Dashboard
      </Button>
    </Box>
  );
};

export default NotFoundPage;
