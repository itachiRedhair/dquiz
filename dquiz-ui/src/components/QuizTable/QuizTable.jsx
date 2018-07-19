import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import styles from './QuizTableStyle';

const QuizTable = ({ classes }) => (
  <Paper className={classes.root}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Dessert (100g serving)</TableCell>
          <TableCell>Calories</TableCell>
          <TableCell>Fat (g)</TableCell>
          <TableCell>Carbs (g)</TableCell>
          <TableCell>Protein (g)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow className={classes.row} key="sample">
          <TableCell>sample</TableCell>
          <TableCell>sample</TableCell>
          <TableCell>sample</TableCell>
          <TableCell>sample</TableCell>
          <TableCell>sample</TableCell>
        </TableRow>
        <TableRow className={classes.row} key="sample1">
          <TableCell>sample</TableCell>
          <TableCell>sample</TableCell>
          <TableCell>sample</TableCell>
          <TableCell>sample</TableCell>
          <TableCell>sample</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Paper>
);

QuizTable.propTypes = {
  classes: PropTypes.shape({
    row: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired,
    table: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(QuizTable);
