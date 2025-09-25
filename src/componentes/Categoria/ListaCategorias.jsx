import React, { useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography, Box, TablePagination, Snackbar, Alert
} from "@mui/material";
import useCategorias from "../../hooks/categorias/useCategorias";

export default function ListaCategorias() {
    const { categorias, cargando: cargandoCategorias } = useCategorias();
    const [alerta, setAlerta] = useState({ abierto: false, mensaje: "", severidad: "success" });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (cargandoCategorias) return <Typography>Cargando categorías...</Typography>;
    if (!categorias || categorias.length === 0) return <Typography>No hay categorías aún</Typography>;

    const categoriasArray = Array.isArray(categorias) ? categorias : [];
    const categoriasMostradas = categoriasArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


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
                        {categoriasMostradas.map((categoria) => (
                            <TableRow key={categoria.id}>
                                <TableCell>{categoria.id}</TableCell>
                                <TableCell>{categoria.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <TablePagination
                    component="div"
                    count={categorias.length}
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
