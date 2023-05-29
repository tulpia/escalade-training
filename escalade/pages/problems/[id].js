import { useRouter } from "next/router";
import { useProblems } from "@/components/hooks/useProblems";
import { useEffect, useState } from "react";
import {
  CircularProgress,
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Button,
  Alert,
} from "@mui/material";
import levels from "@/src/levels";

export default function Problem() {
  const router = useRouter();
  const { id } = router.query;
  const { problems, isLoading, isError } = useProblems(id);
  const [formEntries, setFormEntries] = useState({
    level: "",
    tries: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSaving(true);

    fetch(`/api/problems/${id}`, {
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
      });
  };

  useEffect(() => {
    if (problems && !isError) {
      for (const [key, value] of Object.entries(problems)) {
        if (Object.hasOwn(formEntries, key) && value) {
          setFormEntries((prevEntry) => {
            return {
              ...prevEntry,
              [key]: value,
            };
          });
        }
      }
    }
  }, [problems, isError]);

  if (isLoading && !formEntries.level) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom={true}>
        Entry {id}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
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
          <Grid item xs={6}>
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
  );
}
