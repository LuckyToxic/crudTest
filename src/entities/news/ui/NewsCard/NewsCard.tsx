import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { News } from "../../model"
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


type Props = {
    oneNews : News
    onEdit: (news:News)=> void
    onDelete:(id:string)=> void
}

export default function NewsCard({oneNews,onEdit,onDelete}:Props) {
 return (
   <Card sx={{ minWidth: 275, m: 2 }}>
     <CardContent>
       <Typography variant="h5" component="div">
         {oneNews.title}
       </Typography>
       <Typography sx={{ mb: 1.5 }} color="text.secondary">
         {new Date(oneNews.date).toLocaleDateString()}
       </Typography>
       <Typography variant="body2">{oneNews.content}</Typography>
     </CardContent>
     <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
       <Button
         size="small"
         startIcon={<EditIcon />}
         onClick={() => onEdit(oneNews)}
       >
         Edit
       </Button>
       <Button
         size="small"
         startIcon={<DeleteIcon />}
         onClick={() => onDelete(oneNews.id)}
         color="error"
       >
         Delete
       </Button>
     </Box>
   </Card>
 );
}
