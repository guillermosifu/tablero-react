import DataTable from 'react-data-table-component'

export const TableBasic = (props) => {

  const customStyles =  {
      headRow: {
          style: {
              backgroundColor: "#F4F6F8",
              color: "#637381",
              fontSize: '14px',
              fontWeight: '600',
            },
      },
      headCells: {
        style: {
          padding: '16px'
        }
      },
      cells: {
        style: {
          padding: '16px'
        }
      }
    };

  

  return (
    <div>
      <DataTable
       pagination
       paginationPerPage={10}
       paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
       paginationComponentOptions={{
         rowsPerPageText: "Filas por página:",
         rangeSeparatorText: "de",
         noRowsPerPage: false,
         selectAllRowsItem: true,
         selectAllRowsItemText: "Todos",
       }}
        customStyles={customStyles}
        noDataComponent={<p className="text-base text-gray-400">No hay información para mostrar</p>}
        {...props}
      />
    </div>
  );
};