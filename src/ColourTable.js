import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {

    },
    tableContainer: {
        overflowX: 'hidden',
    },
    link: {
        color: theme.palette.text.primary,
    },
}));

export default function ColourTable(props) {
    const classes = useStyles(props);

    props.rows.sort((a, b) => { return b.count - a.count });

    return (
        <TableContainer className={classes.tableContainer} component={Paper}>
            <Table stickyHeader className={classes.table} size="small" aria-label="Colours used">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Leggo Name</TableCell>
                        {/* <TableCell>BrickLink Name</TableCell> */}
                        <TableCell>Quantity</TableCell>
                        {/* <TableCell>Round Plate 1x1</TableCell>
                        <TableCell>Round Tile 1x1</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row) => (
                        <TableRow key={row.colour.legoColourId}>
                            <TableCell component="th" scope="row">
                                <svg height="20" width="20">
                                    <circle cx="10" cy="10" r="8" stroke={row.colour.hex} strokeWidth="1" fill={row.colour.hex} />
                                </svg>
                            </TableCell>

                            <TableCell>
                                <Link className={classes.link} href={'https://www.bricklink.com/v2/catalog/catalogitem.page?P=4073#T=C&C=' + row.colour.BrickLinkId} target="_blank" rel="noopener noreferrer">{row.colour.name}</Link>
                            </TableCell>

                            {/* <TableCell>{row.colour.BrickLinkName}</TableCell> */}
                            <TableCell>{row.count}</TableCell>
                            {/* <TableCell>
                                <a href={'https://www.bricklink.com/v2/catalog/catalogitem.page?P=4073#T=C&C=' + row.colour.BrickLinkId} target="_blank" rel="noopener noreferrer">bricklink</a>
                            </TableCell>
                            <TableCell>
                                <a href={'https://www.bricklink.com/v2/catalog/catalogitem.page?P=98138#T=S&C=' + row.colour.BrickLinkId} target="_blank" rel="noopener noreferrer">bricklink</a>
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}