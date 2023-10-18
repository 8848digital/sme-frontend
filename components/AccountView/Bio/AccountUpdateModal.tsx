import React, { useState } from "react";
import { Button, Modal, Box, TextField, Chip } from "@mui/material";

interface User {
  photoUrl: string;
  bio: string;
  techSkills: string[];
  languages: string[];
  certifications: string[];
}

const AccountUpdateModal = ({ user, isOpen, onClose, onUpdateUser }: any) => {
  const [updatedUser, setUpdatedUser] = useState<any>(user);

  const handleSave = () => {
    onUpdateUser(updatedUser);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          padding: 2,
          minWidth: 600,
        }}
      >
        <h2>Update User Data</h2>
        <div className="my-3">
          <TextField
            label="Photo URL"
            fullWidth
            value={updatedUser.photoUrl}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, photoUrl: e.target.value })
            }
          />
        </div>
        <div className="my-3">
          <TextField
            label="Bio"
            fullWidth
            multiline
            value={updatedUser.bio}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, bio: e.target.value })
            }
          />
        </div>

        <div className="my-3">
          <TextField
            label="Tech Skills"
            fullWidth
            value={updatedUser.techSkills.join(", ")}
            onChange={(e) =>
              setUpdatedUser({
                ...updatedUser,
                techSkills: e.target.value.split(", "),
              })
            }
          />
        </div>

        <div className="my-3">
          <TextField
            label="Languages"
            fullWidth
            value={updatedUser.languages.join(", ")}
            onChange={(e) =>
              setUpdatedUser({
                ...updatedUser,
                languages: e.target.value.split(", "),
              })
            }
          />
        </div>

        <div className="my-3">
          <TextField
            label="Certifications"
            fullWidth
            value={updatedUser.certifications.join(", ")}
            onChange={(e) =>
              setUpdatedUser({
                ...updatedUser,
                certifications: e.target.value.split(", "),
              })
            }
          />
        </div>

        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" onClick={onClose} sx={{ marginLeft: 2 }}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AccountUpdateModal;
