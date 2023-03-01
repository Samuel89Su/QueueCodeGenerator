// Markdown Extractor

const fs = require("fs");

function extractTables() {
    const tables = new Array();

    const doc = fs.readFileSync(`database.md`, {
      encoding: "utf8",
    });

    const docLines = doc.split("\n");
    let schema = "";
    let tableName = "";
    let table = {
      columns: [],
      indexes: [],
    };
    for (let lineIndex = 0; lineIndex < docLines.length; lineIndex++) {
      const line = docLines[lineIndex];
      if (!line || line === "" || line.trim() === "") {
        continue;
      } else if (line.startsWith("## ")) {
        schema = line.replaceAll("##", "").trim();
        console.log(`Schema: ${schema}`);
      } else if (line.startsWith("### ")) {
        // push previous table
        if (table.name) {
          tables.push(table);
        }

        tableName = line.replaceAll("### ", "").split("-")[1].trim();
        console.log(`Table: ${tableName}`);

        table = {
          columns: [],
          indexes: [],
        };
        table.name = tableName;
        table.schema = schema;

        lineIndex += 2;
      } else if (line.startsWith("#### ")) {
        // index
        let index = docLines[lineIndex + 3];
        console.log(`Index: ${index}`);

        let props = index.split("|");
        table.indexes.push({
          name: props[1].trim(),
          columns: props[2].trim(),
          includes: props[3].trim(),
          isClustered: props[4].trim().toLowerCase() === "yes" ? true : false,
          isUnique: props[5].trim().toLowerCase() === "yes" ? true : false,
        });

        lineIndex += 3;
      } else {
        // Column
        console.log(`Column: ${line}`);

        let props = line.split("|");
        table.columns.push({
          name: props[1].trim(),
          type: props[2].trim(),
          nullable: props[3].trim().toLowerCase() === "no" ? false : true,
          defaultValue: props[4].trim(),
          isPrimaryKey: props[5].trim().toLowerCase() === "yes" ? true : false,
        });
      }

      if (lineIndex === docLines.length - 1) {
        // push last table
        if (table.name) {
          tables.push(table);
        }
      }
    }

    return tables;
  }


const MarkdownExtractor = {
    extractTables
};

module.exports = MarkdownExtractor;
