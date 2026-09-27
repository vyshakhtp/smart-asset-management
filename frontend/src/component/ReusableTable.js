import React from 'react';
import { Table } from 'react-bootstrap';

function ReusableTable({ columns, data }) {
    return (
        <Table striped responsive hover bordered>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.key}>
                            {column.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        {columns.map((column) => (
                            <td key={column.key}>
                                {column.render
                                    ? column.render(item)
                                    : item[column.key]
                                }
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>

        </Table>
    );
}

export default ReusableTable;