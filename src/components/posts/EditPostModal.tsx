import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

export default function EditPostDialog({ open, post, onClose, onSave }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleSubmit = async () => {
    try {
      const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
      await axios.put(`${baseUrl}posts/${post.id}`, { title, content });
      onSave({ ...post, title, content }); // update parent state
      onClose();
    } catch (error) {
      console.error("Error updating post", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
