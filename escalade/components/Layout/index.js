import Header from "./Header";
import Container from "@mui/material/Container";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <main>{children}</main>
      </Container>
    </>
  );
}
