const fs = require("fs");

const tables = new Array();

const doc = fs.readFileSync(`database.md`, {
    encoding: "utf8",
  });

const docLines = doc.split('\n');
let schema = '';
let tableName = '';
let table = {
    columns: [],
    indexes: [],
};
for (let lineIndex = 0; lineIndex < docLines.length; lineIndex++) {
    const line = docLines[lineIndex];
    if (!line || line==='' || line.trim() === '') {
        continue;
    } else if (line.startsWith('## ')) {
        schema = line.replaceAll('##', '').trim();
        console.log(`Schema: ${schema}`);
    } else if (line.startsWith('### ')) {

        // push previous table
        if (table.name) {
            tables.push(table);
        }

        tableName = line.replaceAll('### ', '').split('-')[1].trim();
        console.log(`Table: ${tableName}`);

        table = {
            columns: [],
            indexes: [],
        };
        table.name = tableName;
        table.schema = schema;

        lineIndex += 2;
    } else if (line.startsWith('#### ')) {  // index
        let index = docLines[lineIndex + 3];
        console.log(`Index: ${index}`);

        let props = index.split('|')
        table.indexes.push({
            name: props[1].trim(),
            columns: props[2].trim(),
            includes: props[3].trim(),
            isClustered: props[4].trim().toLowerCase() === 'yes' ? true : false,
            isUnique: props[5].trim().toLowerCase() === 'yes' ? true : false,
        });

        lineIndex += 3;
    } else {    // Column
        console.log(`Column: ${line}`);

        let props = line.split('|');
        table.columns.push({
            name: props[1].trim(),
            type: props[2].trim(),
            nullable: props[3].trim().toLowerCase() === 'no' ? false : true,
            defaultValue: props[4].trim(),
            isPrimaryKey: props[5].trim().toLowerCase() === 'yes' ? true : false,
        });
    }
}

const ddl_table_template = fs.readFileSync(`ddl_table_template.sql`, {
    encoding: "utf8",
  });

const ddl_table_index_template = fs.readFileSync(`ddl_table_index_template.sql`, {
    encoding: "utf8",
  });

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

    let ddl = ddl_table_template
        .replaceAll('#schema#', tableObj.schema)
        .replaceAll('#TableName#', tableObj.name)
        .replaceAll('#columns#', columns)
        .replaceAll('#indexes#', ddl_index);

    fs.writeFile(`./ddlSqls/DDL_${tableObj.schema}_${tableObj.name}.sql`, ddl, ()=>{});
}
