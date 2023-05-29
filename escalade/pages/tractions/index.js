import { useTractions } from "@/components/hooks/useTractions";
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  TextField,
  Paper,
  Button,
  Alert,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Link from "@/components/Link";
import dayjs from "dayjs";

export default function Tractions() {
  const { tractions, isLoading, isError } = useTractions();
  const [formEntries, setFormEntries] = useState({
    nb_tractions: "",
    date: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSaving(true);
    setIsSaved(false);

    fetch(`/api/tractions`, {
      method: "POST",
      body: JSON.stringify(formEntries),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsSaving(false);
        setIsSaved(true);

        tractions.push(res);
      });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom={true}>
          Ajouter des tractions
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="nb_tractions"
                id="nb_tractions"
                label="Tractions"
                type="number"
                variant="standard"
                value={formEntries.nb_tractions}
                onChange={(event) => {
                  setFormEntries((prevEntry) => {
                    return {
                      ...prevEntry,
                      nb_tractions: event.target.value,
                    };
                  });
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                name="date"
                id="date"
                label="Date"
                value={formEntries.date}
                onChange={(value) => {
                  setFormEntries((prevEntry) => {
                    return {
                      ...prevEntry,
                      date: value,
                    };
                  });
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={8}>
              {isSaving ? (
                <CircularProgress />
              ) : (
                <Button type="submit" variant="contained">
                  Sauvegarder
                </Button>
              )}
            </Grid>
            {isSaved ? (
              <Grid item xs={4}>
                <Alert severity="success">Informations sauvegardées</Alert>
              </Grid>
            ) : null}
          </Grid>
        </form>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom={true}>
          Historique
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Nombre de tractions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tractions.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Link href={`/tractions/${row.id}`} underline="none">
                      {dayjs(row.date).format("DD/MM/YYYY")}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{row.nb_tractions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
