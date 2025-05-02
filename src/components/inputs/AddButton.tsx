import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function FloatingActionButtonSize() {
  return (
    <Box sx={{ width: 20, height: 20, borderRadius: 5 }}>
      <Fab sx={{ width: 50, height: 50 }} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  );
}
