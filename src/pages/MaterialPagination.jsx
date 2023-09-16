import { TablePagination } from "@mui/material";
import PropTypes from "prop-types";

export const MaterialPagination = ({
  rowsPerPage,
  rowCount,
  onChangePage,
  onChangeRowsPerPage,
  currentPage,
}) => (
  <TablePagination
    rowsPerPageOptions={[5, 10, 25]}
    component="div"
    count={rowCount}
    rowsPerPage={rowsPerPage}
    page={currentPage - 1}
    onPageChange={onChangePage}
    onRowsPerPageChange={({ target }) =>
      onChangeRowsPerPage(Number(target.value))
    }
  />
);

MaterialPagination.propTypes = {
  rowsPerPage: PropTypes.number,
  rowCount: PropTypes.number,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  currentPage: PropTypes.number,
};
