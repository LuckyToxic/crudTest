import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router";

export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        boxShadow: "none",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        {/* Лого и название */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            sx={{ mr: 1, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            NewsHub
          </Typography>
        </Box>

        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
          <Button
            component={Link}
            to="/news"
            color="inherit"
            sx={{ textTransform: "none", fontWeight: 500 }}
          >
            Все новости
          </Button>
          <Button
            component={Link}
            to="/categories"
            color="inherit"
            sx={{ textTransform: "none", fontWeight: 500 }}
          >
            Категории
          </Button>
          <Button
            component={Link}
            to="/about"
            color="inherit"
            sx={{ textTransform: "none", fontWeight: 500 }}
          >
            О проекте
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{ textTransform: "none" }}
          >
            Войти
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
          >
            Регистрация
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
