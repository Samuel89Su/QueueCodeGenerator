// SQL DDL Exporter

const fs = require("fs");

function exportSql(tables) {

    const ddl_table_template = fs.readFileSync(`ddl_table_template.sql`, {
        encoding: "utf8",
      });
    
    const ddl_table_index_template = fs.readFileSync(`ddl_table_index_template.sql`, {
        encoding: "utf8",
      });
    
    // generate db scripts
    for (const tableObj of tables) {
    
        let columns = '';
        tableObj.columns.forEach(column => {
            columns += `    [${column.name}] ${column.type} ${!column.nullable?'NOT NULL':''} ${column.defaultValue!==''?`DEFAULT(${column.defaultValue})`:''},\n`;
        });
        columns = columns.substring(0, columns.lastIndexOf(',\n'));
    
        let ddl_index = '';
        if (tableObj.indexes && tableObj.indexes.length > 0) {
            for (const index of tableObj.indexes) {
                ddl_index += ddl_table_index_template
                        .replaceAll('#schema#', tableObj.schema)
                        .replaceAll('#TableName#', tableObj.name)
                        .replaceAll('#joinedColumns#', index.columns.toLowerCase().replaceAll('asc','').replaceAll('desc','').replaceAll(',','_').replaceAll(' ',''))
                        .replaceAll('#indexColumns#', index.columns)
                        .replaceAll('#clustered#', !index.isClustered ? 'NON' : '')
                    + '\n';
            }
        }
    
        console.log(`${tableObj.schema}.${tableObj.name}`);
        let ddl = ddl_table_template
            .replaceAll('#schema#', tableObj.schema)
            .replaceAll('#TableName#', tableObj.name)
            .replaceAll('#columns#', columns)
            .replaceAll('#indexes#', ddl_index);
    
        fs.writeFileSync(`./ddlSqls/DDL_${tableObj.schema}_${tableObj.name}.sql`, ddl);
    }
}

const SQLDDLExporter = { exportSql };

module.exports = SQLDDLExporter;