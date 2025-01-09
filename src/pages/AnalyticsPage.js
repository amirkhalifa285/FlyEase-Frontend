import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import MenuAppBar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const dataUserGrowth = [
  { month: "Jan", users: 50 },
  { month: "Feb", users: 100 },
  { month: "Mar", users: 150 },
  { month: "Apr", users: 200 },
];

const dataFlightStatus = [
  { status: "Active", value: 70 },
  { status: "Delayed", value: 20 },
  { status: "Cancelled", value: 10 },
];

const dataRoleDistribution = [
  { role: "User", value: 120 },
  { role: "Admin", value: 30 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

function AnalyticsPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <MenuAppBar />

      {/* Content */}
      <Box sx={{ flex: "1", padding: "20px" }}>
        <Typography variant="h4" mb={3}>
          Analytics Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* User Growth Chart */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" mb={2}>
                User Growth Over Time
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dataUserGrowth}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Flight Status Chart */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" mb={2}>
                Flight Status Breakdown
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataFlightStatus}
                    dataKey="value"
                    nameKey="status"
                    outerRadius={100}
                    label
                  >
                    {dataFlightStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Role Distribution Chart */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" mb={2}>
                Active Users by Role
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dataRoleDistribution}>
                  <XAxis dataKey="role" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default AnalyticsPage;
