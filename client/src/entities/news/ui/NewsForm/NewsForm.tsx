import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { News, NewsWithoutId } from "../../model";
import { schema } from "./schema";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: NewsWithoutId) => void;
  initialData?: News | null;
};

export const NewsForm = ({ open, onClose, onSubmit, initialData }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<NewsWithoutId>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      date: new Date().toISOString(),
    },
  });

  useEffect(() => {
    reset({
      title: initialData?.title || "",
      content: initialData?.content || "",
      date: new Date().toISOString(),
    });
  }, [initialData, open, reset]);

  const onFormSubmit = (data: NewsWithoutId) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={window.innerWidth < 600} 
      PaperProps={{
        sx: {
          width: '80%',
          maxWidth: { xs: '100%', sm: '500px' }, 
          margin: { xs: 0, sm: 2 },
          height: { xs: '40%', sm: 'auto' },
          borderRadius:'20px'
        }
      }}
    >
      <DialogTitle sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
        {initialData ? "Edit News" : "Add News"}
      </DialogTitle>
      
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent dividers sx={{ padding: { xs: 1, sm: 2 } }}>
          <TextField
            {...register("title")}
            label="Title"
            fullWidth
            margin="normal"
            size="small"
            error={!!errors.title}
            helperText={errors.title?.message || " "}
            FormHelperTextProps={{ style: { minHeight: '20px' } }}
            sx={{ marginBottom: 2 }}
          />
          
          <TextField
            {...register("content")}
            label="Content"
            fullWidth
            margin="normal"
            multiline
            minRows={window.innerWidth < 600 ? 3 : 4}
            maxRows={window.innerWidth < 600 ? 6 : 8}
            size="small"
            error={!!errors.content}
            helperText={errors.content?.message || " "}
          />
        </DialogContent>

        <DialogActions sx={{ padding: { xs: 1, sm: 2 } }}>
          <Button onClick={onClose} size="small">
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={!isValid}
            size="small"
          >
            {initialData ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
