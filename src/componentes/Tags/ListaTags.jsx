import React, { useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography, Box,
    TablePagination, Snackbar, Alert
} from "@mui/material";
import useTags from "../../hooks/tags/useTags";

export default function ListaTags() {
    const { tags, cargando } = useTags();
    const [alerta, setAlerta] = useState({ abierto: false, mensaje: "", severidad: "success" });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (cargando) return <Typography>Cargando tags...</Typography>;
    if (!tags || tags.length === 0) return <Typography>No hay tags aún</Typography>;

    const tagsMostrados = tags.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box>
            <Snackbar
                open={alerta.abierto}
                autoHideDuration={5000}
                onClose={() => setAlerta({ ...alerta, abierto: false })}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setAlerta({ ...alerta, abierto: false })}
                    severity={alerta.severidad}
                    sx={{ width: '100%' }}
                >
                    {alerta.mensaje}
                </Alert>
            </Snackbar>

            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tagsMostrados.map((tag) => (
                            <TableRow key={tag.id}>
                                <TableCell>{tag.id}</TableCell>
                                <TableCell>{tag.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <TablePagination
                    component="div"
                    count={tags.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </TableContainer>
        </Box>
    );
}
