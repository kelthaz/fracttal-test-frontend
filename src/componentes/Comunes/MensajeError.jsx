import { Alert } from "@mui/material";

export default function MensajeError({ mensaje }) {
  return (
    <Alert severity="error" sx={{ mt: 2 }}>
      {mensaje}
    </Alert>
  );
}
