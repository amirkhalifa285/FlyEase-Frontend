import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Generate breadcrumb items based on the current path
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator="›" // Custom separator
      sx={{
        padding: "20px",
        "& .MuiBreadcrumbs-separator": {
          color: "white", // Match text color
          fontSize: "18px", // Match text size
          fontWeight: "bold",
        },
        "& .MuiLink-root": {
          color: "white", // Links color
          fontSize: "18px", // Increase font size
          fontWeight: "bold",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
        "& .MuiTypography-root": {
          color: "white", // Current breadcrumb color
          fontSize: "18px", // Increase font size
          fontWeight: "bold",
        },
      }}
    >
      <Link
        underline="hover"
        color="inherit"
        onClick={() => navigate("/UserInterface")} // Navigate to UserInterface page
        sx={{ cursor: "pointer" }}
      >
        Home
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography key={to} color="inherit">
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Typography>
        ) : (
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate(to)}
            sx={{ cursor: "pointer" }}
            key={to}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
