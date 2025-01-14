import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import MenuAppBar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

function UserManagementPage() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "User", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin", status: "Inactive" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "User", status: "Active" },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", email: "", role: "User" });

  // Open Dialog for Add/Edit
  const handleOpenDialog = (user = { name: "", email: "", role: "User" }) => {
    setCurrentUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle Save User
  const handleSaveUser = () => {
    if (currentUser.id) {
      // Edit user logic for static data
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === currentUser.id ? { ...user, ...currentUser } : user
        )
      );
    } else {
      // Add user logic for static data
      setUsers((prevUsers) => [
        ...prevUsers,
        { id: Date.now(), ...currentUser, status: "Active" },
      ]);
    }
    setOpenDialog(false);
  };

  // Handle Delete User
  const handleDeleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

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
          User Management
        </Typography>
        <Button variant="contained" onClick={() => handleOpenDialog()} sx={{ marginBottom: 2 }}>
          Add User
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenDialog(user)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(user.id)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add/Edit User Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{currentUser.id ? "Edit User" : "Add User"}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              value={currentUser.name}
              onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              value={currentUser.email}
              onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Role"
              value={currentUser.role}
              onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveUser}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default UserManagementPage;
