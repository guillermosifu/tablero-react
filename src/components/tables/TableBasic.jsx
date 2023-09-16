import { Checkbox } from "@mui/material";
import DataTable from "react-data-table-component";
import { MaterialPagination } from "../../pages/MaterialPagination";

export const TableBasic = (props) => {
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#F4F6F8",
        color: "#637381",
        fontSize: "14px",
        fontWeight: "600",
      },
    },
    headCells: {
      style: {
        padding: "16px",
      },
    },
    cells: {
      style: {
        padding: "16px",
      },
    },
  };

  return (
    <DataTable
      customStyles={customStyles}
      noDataComponent={
        <p className="text-base text-gray-400">
          No hay información para mostrar
        </p>
      }
      selectableRows 
      selectableRowsComponent={Checkbox}
      pagination
      paginationComponent={MaterialPagination}
      {...props}
    />
  );
};
