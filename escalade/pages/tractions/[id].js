import { useRouter } from "next/router";
import { useTractions } from "@/components/hooks/useTractions";
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

export default function Problem() {
  const router = useRouter();
  const { id } = router.query;
  const { tractions, isLoading, isError } = useTractions(id);
  const [formEntries, setFormEntries] = useState({
    nb_tractions: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSaving(true);

    fetch(`/api/tractions/${id}`, {
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
    if (tractions && !isError) {
      for (const [key, value] of Object.entries(tractions)) {
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
  }, [tractions, isError]);

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
          <Grid item xs={12}>
            <TextField
              name="nb_tractions"
              id="nb_tractions"
              label="Nombre de tractions"
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
