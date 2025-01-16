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
        backgroundColor: "#f8f9fa", // Light background for visibility
        borderRadius: "8px",
        "& .MuiBreadcrumbs-separator": {
          color: "#6c757d", // Separator color
          fontSize: "18px",
        },
        "& .MuiLink-root": {
          color: "#007bff", // Link color
          fontSize: "16px",
          fontWeight: "bold",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
        "& .MuiTypography-root": {
          color: "#495057", // Current breadcrumb color
          fontSize: "16px",
          fontWeight: "bold",
        },
      }}
    >
      {/* Home link */}
      <Link
        underline="hover"
        color="inherit"
        onClick={() => navigate("/UserInterface")}
        sx={{ cursor: "pointer" }}
      >
        Home
      </Link>

      {/* Dynamic breadcrumbs */}
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography key={to}>{capitalize(value)}</Typography>
        ) : (
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate(to)}
            sx={{ cursor: "pointer" }}
            key={to}
          >
            {capitalize(value)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

// Helper function to capitalize the first letter
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default Breadcrumb;
