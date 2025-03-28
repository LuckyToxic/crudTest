import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/reduxHooks";
import { News, NewsWithoutId } from "../../model";
import {
  addNewsThunk,
  deleteNewsThunk,
  getAllNewsThunk,
  updateNewsThunk,
} from "../../api";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NewsCard from "../NewsCard/NewsCard";
import { NewsForm } from "../NewsForm/NewsForm";

export default function NewsList() {
  const dispatch = useAppDispatch();
  const { news, isLoading, error } = useAppSelector((state) => state.news);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentNews, setCurrentNews] = useState<News | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    dispatch(getAllNewsThunk());
  }, [dispatch]);

  const handleAdd = async (newsItem: NewsWithoutId) => {
    try {
      await dispatch(addNewsThunk(newsItem))
      setSnackbarMessage("News added successfully!");
      setSnackbarOpen(true);
    } catch {
      setSnackbarMessage("Failed to add news");
      setSnackbarOpen(true);
    }
  };

  const handleUpdate = async (newsItem: News) => {
    try {
      await dispatch(updateNewsThunk(newsItem))
      setSnackbarMessage("News updated successfully!");
      setSnackbarOpen(true);
    } catch {
      setSnackbarMessage("Failed to update news");
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteNewsThunk(id))
      setSnackbarMessage("News deleted successfully!");
      setSnackbarOpen(true);
    } catch {
      setSnackbarMessage("Failed to delete news");
      setSnackbarOpen(true);
    }
  };

  const handleOpenAddDialog = () => {
    setCurrentNews(null);
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (news: News) => {
    setCurrentNews(news);
    setOpenDialog(true);
  };

  const handleSubmit = (formData: NewsWithoutId) => {
    if (currentNews) {
      handleUpdate({ ...currentNews, ...formData });
    } else {
      handleAdd(formData);
    }
    setOpenDialog(false);
  };

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
        >
          Add News
        </Button>
      </Box>

      <Grid container spacing={3}>
        {news.map((oneNews) => (
          <NewsCard
            key={oneNews.id}
            oneNews={oneNews}
            onEdit={handleOpenEditDialog}
            onDelete={handleDelete}
          />
        ))}
      </Grid>

      <NewsForm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleSubmit}
        initialData={currentNews}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
}
