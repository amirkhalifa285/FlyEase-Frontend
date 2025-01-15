import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "#3b3b3b", // A darker shade for better contrast
        color: "#ffffff", // White text for readability
        padding: "20px", // Reduced padding
        textAlign: "center",
        marginTop: "20px",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        fontFamily="Roboto"
        mb={1}
        sx={{ fontSize: "16px" }}
      >
        Need Assistance?
      </Typography>
      <Typography sx={{ fontSize: "14px", marginBottom: "10px" }}>
        Contact our support team for any help or queries.
      </Typography>
      <Button
        variant="outlined"
        sx={{
          borderColor: "#ffffff", // White border for the button
          color: "#ffffff", // White text
          fontWeight: "bold",
          padding: "5px 15px",
          fontSize: "14px",
          "&:hover": {
            backgroundColor: "#ffffff", // White background on hover
            color: "#3b3b3b", // Dark text on hover
          },
        }}
        onClick={() => navigate("/contact-support")}
      >
        Contact Support
      </Button>
    </Box>
  );
};

export default Footer;
