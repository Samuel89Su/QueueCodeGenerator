const fs = require("fs");

const MarkdownExtractor = require('./markdownExtractor');

const SQLDDLExporter = require('./sqlDDLExporter');

const CSharpEntityExporter = require('./csharpEntityExporter');

const AutoCodingEntitySQLExporter = require('./autoCodingEntitySQLExporter');

// extract table from markdown
const tables = MarkdownExtractor.extractTables();

// // export SQL DDL
// SQLDDLExporter.exportSql(tables);

// // export CSharp Entity Classes
// CSharpEntityExporter.exportClasses(tables);

// export autocoding config
AutoCodingEntitySQLExporter.exportAutoCodingEntitySql(tables);
