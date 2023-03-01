// AutoCoding Entity SQL Exporter

const fs = require("fs");

const Entity_Default = {
  UniqueName: "",
  Name: "",
  NameForPlural: "",
  Label: "",
  LabelForPlural: "",
  FieldToBeDisplayedWhenReferenced: "",
  Application: "queue",
  FeatureNameForMultiRecord: "",
  IsMultiRecord: 0,
  PermissionForGet: 0,
  PermissionForInsert: 0,
  PermissionForUpdate: 0,
  PermissionForDelete: 0,
  FeatureNameForAvailability: "",
  IsAuthenticateRequired: 1,
  AuditLogActionType: 0,
  DynamicFieldEntity: "",
  IsRecordChangeLog: 0,
  IsSoftDelete: 1,
  DeletePolicy: 0,
  IsRecordAuditLog: 1,
  IsRoot: 0,
  Service: "queueapi",
  TenancyType: 1,
};

const Field_Default = {
  EntityUniqueName: "",
  Name: "",
  Label: "",
  Type: 2,
  IsRequired: 0,
  IsUnique: 0,
  ReferenceEntityName: "",
  IsNullable: 0,
  IsAutoGenerate: 0,
  Default: "",
  MaxLength: 0,
  MinLength: 0,
  Max: 0,
  Min: 0,
  RegexValidation: "",
  ReferenceType: 0,
  IfWillBeDeletedWhileReferencedPrimaryBeingDeleted: 0,
  IsPrimary: 0,
  IfStopDeleteOfReferencedPrimary: 0,
  IfAutoCreateWhenPrimaryCreated: 0,
  SourceDataForAutoCreating: "",
  UpdateOccasion: 0,
  EffectByFieldName: "",
  ConditionForAvailability: "",
  UniquenessScopingField: "",
  AllowedFileExtensions: "",
  Suggestion: "",
  ShadowExpression: "",
  Id: "NEWID()",
  OptionGroupId: "00000000-0000-0000-0000-000000000000",
  Description: "",
  IsBase64EncodeSupported: 0,
  IsRequiredInPath: 0,
};

const tableSample = {
  columns: [
    {
      name: "Id",
      type: "uniqueidentifier",
      nullable: false,
      defaultValue: "NEWID()",
      isPrimaryKey: true,
    },
    {
      name: "SiteId",
      type: "int",
      nullable: false,
      defaultValue: "",
      isPrimaryKey: false,
    },
    {
      name: "QueueId",
      type: "uniqueidentifier",
      nullable: false,
      defaultValue: "",
      isPrimaryKey: false,
    },
    {
      name: "Name",
      type: "nvarchar(256)",
      nullable: false,
      defaultValue: "''",
      isPrimaryKey: false,
    },
    {
      name: "Date",
      type: "datetime2",
      nullable: false,
      defaultValue: "",
      isPrimaryKey: false,
    },
    {
      name: "IsDeleted",
      type: "bit",
      nullable: false,
      defaultValue: "0",
      isPrimaryKey: false,
    },
    {
      name: "RowVersion",
      type: "timestamp",
      nullable: false,
      defaultValue: "",
      isPrimaryKey: false,
    },
  ],
  indexes: [
    {
      name: "IX_T_Queue_Holiday_SiteId_QueueId",
      columns: "SiteId asc, QueueId asc",
      includes: "",
      isClustered: false,
      isUnique: false,
    },
  ],
  name: "T_Queue_Holiday",
  schema: "Site",
};

/**
 *
 * @param Array<Object> tables
 */
function exportAutoCodingEntitySql(tables) {
  exportEntities(tables);

  exportFields(tables);
}

function exportFields(tables) {
  const entities = [];
  const fields = [];

  for (const table of tables) {
    let tableEntity = JSON.parse(JSON.stringify(Entity_Default));
    tableEntity.UniqueName = table.name.replace("T_Queue_", "");
    tableEntity.Name = tableEntity.UniqueName;
    tableEntity.NameForPlural = tableEntity.UniqueName + "s";
    tableEntity.Label = splitByUpper(tableEntity.Name);
    tableEntity.LabelForPlural = splitByUpper(tableEntity.NameForPlural);

    entities.push(tableEntity);

    for (const column of table.columns) {
      if (column.name === "RowVersion") continue;

      let tableField = JSON.parse(JSON.stringify(Field_Default));
      tableField.EntityUniqueName = tableEntity.UniqueName;
      tableField.Name = column.name;
      tableField.IsNullable = column.nullable ? 1 : 0;
      tableField.IsPrimary = column.isPrimaryKey ? 1 : 0;
      tableField.Default = column.defaultValue;

      if (column.type === "uniqueidentifier") {
        tableField.Type = 0;
      } else if (column.type === "bit") {
        tableField.Type = 13;
      } else if (column.type === "image") {
        tableField.Type = 8;
      } else if (column.type === "int") {
        tableField.Type = 5;
      } else if (column.type === "smallint") {
        tableField.Type = 14;
      } else if (column.type.startsWith("nvarchar")) {
        tableField.Type = 2;
        if (/\d+/.test(column.type)) {
          tableField.MaxLength = Number(column.type.match(/\d+/)[0]);
        } else {
        }
      }

      fields.push(tableField);
    }
  }

  let fieldCsv = "";
  let fieldHeaders = [];
  for (const prop in Field_Default) {
    if (Object.hasOwnProperty.call(Field_Default, prop)) {
      fieldHeaders.push(prop);
      fieldCsv += prop + ", ";
    }
  }
  fieldCsv = fieldCsv.substring(0, fieldCsv.length - 1);
  console.log(`Field Headers: ${fieldCsv}`);
  fieldCsv += "\n";

  for (const field of fields) {
    let fieldRow = "";
    for (const entityHeader of fieldHeaders) {
      fieldRow += field[entityHeader] + ", ";
    }
    fieldRow = fieldRow.substring(0, fieldRow.length - 1);
    fieldCsv += fieldRow + "\n";
  }

  console.log(`Field CSV: ${fieldCsv}`);

  fs.writeFileSync(`./autoCoding/fields.csv`, fieldCsv);
}

function exportEntities(tables) {
  const entities = [];
  tables.forEach((table) => {
    let tableEntity = JSON.parse(JSON.stringify(Entity_Default));
    tableEntity.UniqueName = table.name.replace("T_Queue_", "");
    tableEntity.Name = tableEntity.UniqueName;
    tableEntity.NameForPlural = tableEntity.UniqueName + "s";
    tableEntity.Label = splitByUpper(tableEntity.Name);
    tableEntity.LabelForPlural = splitByUpper(tableEntity.NameForPlural);

    entities.push(tableEntity);
  });

  let entityCsv = "";
  let entityHeaders = [];
  for (const prop in Entity_Default) {
    if (Object.hasOwnProperty.call(Entity_Default, prop)) {
      entityHeaders.push(prop);
      entityCsv += prop + ", ";
    }
  }
  entityCsv = entityCsv.substring(0, entityCsv.length - 1);
  console.log(`Entity Headers: ${entityCsv}`);
  entityCsv += "\n";

  for (const entity of entities) {
    let entityRow = "";
    for (const entityHeader of entityHeaders) {
      entityRow += entity[entityHeader] + ", ";
    }
    entityRow = entityRow.substring(0, entityRow.length - 1);
    entityCsv += entityRow + "\n";
  }

  console.log(`Entity CSV: ${entityCsv}`);

  fs.writeFileSync(`./autoCoding/entities.csv`, entityCsv);
}

function splitByUpper(origin) {
  let newWord = "";
  origin.match(/[A-Z]/g).forEach((upperLetter) => {
    newWord = origin.replaceAll(upperLetter, " " + upperLetter);
  });
  return newWord;
}

const AutoCodingEntitySQLExporter = { exportAutoCodingEntitySql };

module.exports = AutoCodingEntitySQLExporter;
