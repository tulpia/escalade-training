import * as React from "react";
import { Box, Typography } from "@mui/material";
import ChartTractions from "@/components/ChartTractions";
import data from "@/src/data";

export default function Index() {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        TODO - Chart Progres - Chart Tractions
      </Typography>
      <Box sx={{ my: 4 }}>
        <ChartTractions data={data} />
      </Box>
    </Box>
  );
}
