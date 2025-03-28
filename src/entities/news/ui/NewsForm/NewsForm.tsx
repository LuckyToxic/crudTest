import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  useMediaQuery,
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
  const isMobile = useMediaQuery('(max-width:600px)')
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
     fullScreen={isMobile}
     PaperProps={{
       sx: {
         width: "80vw", 
         maxWidth: "500px",
         margin: 0,
         height: isMobile ? "60vh" : "auto",
         maxHeight: isMobile ? "none" : "90vh",
         borderRadius: "20px",
         overflowY: "auto", 
       },
     }}
   >
     <DialogTitle
       sx={{
         fontSize: isMobile ? "1.2rem" : "1.5rem",
         padding: isMobile ? "16px" : "24px 24px 16px",
       }}
     >
       {initialData ? "Edit News" : "Add News"}
     </DialogTitle>

     <form onSubmit={handleSubmit(onFormSubmit)}>
       <DialogContent
         dividers
         sx={{
           padding: isMobile ? "8px 16px" : "16px 24px",
         }}
       >
         <TextField
           {...register("title")}
           label="Title"
           fullWidth
           margin="normal"
           size={isMobile ? "small" : "medium"}
           error={!!errors.title}
           helperText={errors.title?.message || " "}
           FormHelperTextProps={{ style: { minHeight: "24px" } }}
           sx={{
             marginBottom: 2,
             "& .MuiInputBase-root": {
               fontSize: isMobile ? "0.875rem" : "1rem",
             },
           }}
         />

         <TextField
           {...register("content")}
           label="Content"
           fullWidth
           margin="normal"
           multiline
           minRows={isMobile ? 3 : 4}
           maxRows={isMobile ? 8 : 12}
           size={isMobile ? "small" : "medium"}
           error={!!errors.content}
           helperText={errors.content?.message || " "}
           sx={{
             "& .MuiInputBase-root": {
               fontSize: isMobile ? "0.875rem" : "1rem",
             },
           }}
         />
       </DialogContent>

       <DialogActions
         sx={{
           padding: isMobile ? "8px" : "16px 24px",
           flexDirection: isMobile ? "column-reverse" : "row",
           gap: 1,
         }}
       >
         <Button
           onClick={onClose}
           size={isMobile ? "small" : "medium"}
           fullWidth={isMobile}
         >
           Cancel
         </Button>
         <Button
           type="submit"
           variant="contained"
           disabled={!isValid}
           size={isMobile ? "small" : "medium"}
           fullWidth={isMobile}
           sx={{
             marginLeft: isMobile ? 0 : "8px",
           }}
         >
           {initialData ? "Update" : "Add"}
         </Button>
       </DialogActions>
     </form>
   </Dialog>
 );
};
