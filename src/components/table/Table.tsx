import styles from './table.module.scss';


interface TableProps {
    headers: string[];
    data: any[];
  }


export const Table: React.FC<TableProps> = ({headers, data}) => {

  return (
    <table className={styles.table}>
        <thead>
            <tr>
            { headers.map((header:any,index:any) => (
                <th key={index}>{header}</th>
            ))}
            </tr>
        </thead>
        <tbody>
            {
                data.map((row:any, rowIndex:any) => (
                    <tr key={rowIndex}>
                        {headers.map((header:any, colIndex:any) => (
                            <td key={colIndex}>{row[header]}</td>
                        ))}
                    </tr>
                ))
            }
        </tbody>        
    </table>
  )
}
