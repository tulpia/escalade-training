import { useProblems } from "@/components/hooks/useProblems";
import { useLevel } from "@/components/hooks/useLevel";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Alert,
} from "@mui/material";
import Link from "@/components/Link";
import { useState } from "react";
import levels from "@/src/levels";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function Problems() {
  const { problems, isLoading, isError } = useProblems();
  const [formEntries, setFormEntries] = useState({
    level: "",
    tries: "",
    date: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSaving(true);
    setIsSaved(false);

    fetch(`/api/problems`, {
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

        problems.push(res);
      });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom={true}>
          Ajouter un bloc
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <TextField
                name="level"
                id="level"
                label="Niveau"
                variant="standard"
                value={formEntries.level}
                onChange={(event) => {
                  setFormEntries((prevEntry) => {
                    return {
                      ...prevEntry,
                      level: event.target.value,
                    };
                  });
                }}
                fullWidth
                select
              >
                {Object.keys(levels).map((level) => (
                  <MenuItem key={level} value={level}>
                    {levels[level]}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={5}>
              <TextField
                name="tries"
                id="tries"
                label="Essais"
                type="number"
                variant="standard"
                value={formEntries.tries}
                onChange={(event) => {
                  setFormEntries((prevEntry) => {
                    return {
                      ...prevEntry,
                      tries: event.target.value,
                    };
                  });
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
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
                <TableCell align="right">Niveau</TableCell>
                <TableCell align="right">Essais</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {problems.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Link href={`/problems/${row.id}`} underline="none">
                      {dayjs(row.date).format("DD/MM/YYYY")}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{useLevel(row.level)}</TableCell>
                  <TableCell align="right">{row.tries}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
