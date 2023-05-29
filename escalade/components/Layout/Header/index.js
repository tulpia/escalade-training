import "./styles.module.scss";
import { useRouter } from "next/router";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import Link from "@/components/Link";
import { useState, useEffect } from "react";

const pages = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Blocs",
    link: "/problems",
  },
  {
    title: "Tractions",
    link: "/tractions",
  },
];

export default function Header() {
  const [activePage, setActivePage] = useState("");
  const [activeTitle, setActiveTitle] = useState("Block'out");
  const router = useRouter();

  useEffect(() => {
    if (activePage !== router.pathname) {
      setActivePage(router.pathname);

      pages.forEach((page) => {
        if (page.link === router.pathname) {
          setActiveTitle(page.title);
        } else {
          setActivePage("Block'out");
        }
      });
    }
  }, [router, activePage, setActivePage]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="lg">
          <Box sx={{ display: { xs: "flex" } }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {activeTitle}
            </Typography>
            <Box sx={{ display: { xs: "flex" } }}>
              {pages.map((page) => (
                <Link key={page.link} href={page.link} underline="hover">
                  <Button variant="text" color="white">
                    {page.title}
                  </Button>
                </Link>
              ))}
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
