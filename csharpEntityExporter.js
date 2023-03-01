// C# Entity Exporter

const fs = require("fs");

function exportClasses(tables) {
  const ddl_table_index_template = fs.readFileSync(
    `ddl_table_index_template.sql`,
    {
      encoding: "utf8",
    }
  );

  // generate C# classes
  const cls_template = fs.readFileSync(`clss.cs`, {
    encoding: "utf8",
  });
  for (const tableObj of tables) {
    let columns = "";
    tableObj.columns.forEach((column) => {
      columns +=
        `        public ` +
        (column.type === "uniqueidentifier"
          ? "Guid"
          : column.type.startsWith("nvarchar")
          ? "string"
          : column.type === "bit"
          ? "bool"
          : column.type === "timestamp"
          ? "byte[]"
          : column.type === "image"
          ? "byte[]"
          : column.type) +
        ` ${column.name} { get; set; }` +
        (column.defaultValue === "NEWID()"
          ? " = Guid.NewGuid();"
          : column.defaultValue !== ""
          ? " = " + column.defaultValue + ";"
          : " = string.Empty;") +
        "\n";
    });
    // columns = columns.substring(0, columns.lastIndexOf(',\n'));

    let className = tableObj.name.replaceAll("T_Queue_", "");
    console.log(`${className}`);
    let cls = cls_template
      .replaceAll("#TableName#", tableObj.name)
      .replaceAll("#upperClassName#", className.toUpperCase())
      .replaceAll("#schema#", tableObj.schema.toUpperCase())
      .replaceAll("#className#", className)
      .replaceAll("#props#", columns);

    fs.writeFileSync(`./classes/${tableObj.schema}/${className}.cs`, cls);
  }
}

const CSharpEntityExporter = { exportClasses };

module.exports = CSharpEntityExporter;
