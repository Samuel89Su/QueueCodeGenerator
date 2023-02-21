
## Partner
### QueueLanguageItem - T_Queue_LanguageItem
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| PartnerId | int | No |  |  |  |
| Language | smallint | No | 0 |  | 0: English..... |
| Category | smallint | No | 1 |  | 1: Location, 2: Queue |
| SystemName | nvarchar(256) | No | '' |  | Identity Name, As Enum in Code |
| Name | nvarchar(256) | No | '' |  | Display Name |
| DefaultText | nvarchar(MAX) | No | '' |  |  |
| Macros | nvarchar(2048) | No | '' |  |  |
| IsDeleted | bit | No | 0 |  |  |
| RowVersion | timestamp | No |  |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_LanguageItem_PartnerId_Language | PartnerId Asc, Language Asc |  | No | No |  |

### QueueNotificationTemplate - T_Queue_QueueNotificationTemplate
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| PartnerId | int | No |  |  |  |
| Language | smallint | No | 0 |  |  |
| NotificationType | smallint | No | 1 |  | 1: SessionCreated, 2: AboutToStart, 3: Summoned, 4: NoShow, 5: Removed  |
| ChannelType | smallint | No | 1 |  | 1: SMS |
| Name | nvarchar(256) | No | '' |  | Display Name |
| DefaultText | nvarchar(MAX) | No | '' |  |  |
| Macros | nvarchar(2048) | No | '' |  |  |
| IsDeleted | bit | No | 0 |  |  |
| RowVersion | timestamp | No |  |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_QueueNotificationTemplate_PartnerId_Language | PartnerId Asc, Language Asc |  | No | No |  |

## Site
### Location - T_Queue_Location
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| SiteId | int | No |  |  |  |
| Name | nvarchar(256) | No | '' |  |  |
| Logo | image | No |  |  |  |
| ThemeColor | nvarchar(32) | No | '#329FD9' |  |  |
| GreetingMessage | nvarchar(MAX) | No | '' |  |  |
| IsDeleted | bit | No | 0 |  |  |
| RowVersion | timestamp | No |  |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_Location_SiteId | SiteId Asc |  | No | No |  |

### Queue - T_Queue_Queue
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| SiteId | int | No |  |  |  |
| LocationId | uniqueidentifier | No |  |  |  |
| Name | nvarchar(256) | No | '' |  |  |
| Description | nvarchar(2048) | No | '' |  |  |
| TimeZone | nvarchar(64) | No | 'Pacific Standard Time' |  | Windows TimeZone Name |
| IsClosed | bit | No | 0 |  |  |
| IsStatusManuallyControlled | bit | No | 0 |  |  |
| InitialServeDuration | int | No | 30 |  | in Minutes |
| ServiceAgentCount | int | No | 1 |  |  |
| AvgSessionServeDuration | int | No | 30 |  | Calc & update after session end |
| SummonToNoShowTime | int | No | 15 |  | in Minutes, 0 means never set to NoShow |
| NoShowToRemovedTime | int | No | 60 |  | in Minutes |
| AboutToStartNotificationMinutes | int | No | 10 |  | in Minutes |
| IsDeleted | bit | No | 0 |  |  |
| RowVersion | timestamp | No |  |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_Queue_SiteId_LocationId | SiteId asc, LocationId asc |  | No | No |  |

### QueueLanguageConfig - T_Queue_QueueLanguageConfig
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| SiteId | int | No |  |  |  |  |
| QueueId | uniqueidentifier | No |  |  |  |  |
| Language | smallint | No |  |  |  |
| IsDeleted | bit | No | 0 |  |  |
| RowVersion | timestamp | No |  |  |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_QueueLanguageConfig_SiteId_QueueId | SiteId asc, QueueId asc |  | No | No |  |

### QueueLanguageItem - T_Queue_QueueLanguageItem
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| SiteId | int | No |  |  |  |  |
| QueueId | uniqueidentifier | No |  |  |  |  |
| SystemName | nvarchar(256) | No | '' |  |  | Identity Name |
| Text | nvarchar(MAX) | No | '' |  |  |  |
| IsDeleted | bit | No | 0 |  |  |
| RowVersion | timestamp | No |  |  |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_QueueLanguageItem_SiteId_QueueId | SiteId asc, QueueId asc |  | No | No |  |

### QueueNotificationTemplate - T_Queue_QueueNotificationTemplate
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| SiteId | int | No |  |  |  |
| QueueId | uniqueidentifier | No |  |  |  |
| NotificationType | smallint | No | 1 |  |  |
| ChannelType | smallint | No | 1 |  |  |
| Text | nvarchar(MAX) | No | '' |  |  |
| IsDeleted | bit | No | 0 |  |  |
| RowVersion | timestamp | No |  |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_QueueNotificationTemplate_SiteId_QueueId_NotificationType | SiteId asc, QueueId asc, NotificationType asc |  | No | No |  |

### AgentServiceInQueue - T_Queue_AgentServiceInQueue
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| SiteId | int | No |  |  |  |
| QueueId | uniqueidentifier | No |  |  |  |
| AgentId | uniqueidentifier | No |  |  |  |
| IsDeleted | bit | No | 0 |  |  |
| RowVersion | timestamp | No |  |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_AgentServiceInQueue_SiteId_QueueId | SiteId asc, QueueId asc |  | No | No |  |

### QueueField - T_Queue_QueueField
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| SiteId | int | No |  |   | |
| QueueId | uniqueidentifier | No |  |  |  |
| Name | nvarchar(256) | No | '' |  | Identity Name |
| DisplayName | nvarchar(256) | No | '' |  | Display Name |
| Type | int | No | 1 |  |  |
| Order | int | No | 1 |  | Start from 1 |
| IsSystem | bit | No | 0 |  |  |
| IsRequired | bit | No | 0 |  |  |
| IsVisible | bit | No | 1 |  |  |
| IsDeleted | bit | No | 0 |  |  |
| RowVersion | timestamp | No |  |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_QueueField_SiteId_QueueId | SiteId asc, QueueId asc |  | No | No |  |

### QueueFieldOption - T_Queue_QueueFieldOption
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| SiteId | int | No |  |   | |
| QueueId | uniqueidentifier | No |  |  |  |
| FieldId | uniqueidentifier | No |  |  |  |
| Value | nvarchar(256) | No | '' |  |  |
| Order | int | No | 1 |  | Start from 1 |
| IsDeleted | bit | No | 0 |  |  |
| RowVersion | timestamp | No |  |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_QueueFieldOption_SiteId_QueueId | SiteId asc, QueueId asc |  | No | No |  |

### WorkingHour - T_Queue_WorkingHour
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| SiteId | int | No |  |  |  |
| QueueId | uniqueidentifier | No |  |  |  |
| DayOfWeek | smallint | No |  |  | Sunday:0....Saturday:6  |
| StartTime | datetime2 | No |  |  |  |
| EndTime | datetime2 | No |  |  |  |
| IsDeleted | bit | No | 0 |  |  |
| RowVersion | timestamp | No |  |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_WorkingHour_SiteId_QueueId | SiteId asc, QueueId asc |  | No | No |  |

### Holiday - T_Queue_Holiday
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| SiteId | int | No |  |  |  |
| QueueId | uniqueidentifier | No |  |  |  |
| Name | nvarchar(256) | No | '' |  |  |
| Date | datetime2 | No |  |  |  |
| IsDeleted | bit | No | 0 |  |  |
| RowVersion | timestamp | No |  |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_Holiday_SiteId_QueueId | SiteId asc, QueueId asc |  | No | No |  |

### SMSIntegrationConfig - T_Queue_TwilioSMSIntegrationConfig
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| SiteId | int | No |  |  |  |
| AccountSID | nvarchar(2048) | No | '' |  |  |
| AuthToken | nvarchar(2048) | No | '' |  |  |
| PhoneNumber | nvarchar(32) | No | '' |  |  |
| IsDeleted | bit | No | 0 |  |  |
| RowVersion | timestamp | No |  |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_SMSIntegrationConfig_SiteId | SiteId asc |  | No | No |  |

### QueueSession - T_Queue_QueueSession
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| SiteId | int | No |  |  |  |
| QueueId | uniqueidentifier | No |  |  |  |
| ServiceAgentId | uniqueidentifier | No |  |  | {Agent} |
| Status | int | No |  |  | low 4 bits reserved for by who, 1: bySystem, 2: byAgent.  16: Created, 32: Summoned, 64: Arrived, 128: Ended, 256: NoShow, 512: Removed, 513 RemovedBySystem, 514: RemovedByAgent |
| OriginalEstimatedWaitingTime | int | No |  |  |  |
| EstimatedWaitingTime | int | No |  |  |  |
| QueuePosition | int | No | 1 |  |  |
| CreatedTime | datetime2 | No |  |  |  |
| SummonedTime | datetime2 | No |  |  |  |
| ArrivedTime | datetime2 | No |  |  |  |
| NoShowTime | datetime2 | No |  |  |  |
| EndedTime | datetime2 | No |  |  |  |
| IsDeleted | bit | No | 0 |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_QueueSession_SiteId_CreatedTime_QueueId | SiteId asc, CreatedTime desc, QueueId asc |  | Yes | No |  |

### QueueSessionFieldResult - T_Queue_QueueSessionFieldResult
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| SiteId | int | No |  |  |  |
| QueueSessionId | uniqueidentifier | No |  |  |  |
| FieldId | uniqueidentifier | No |  |  |  |
| FieldName | nvarchar(256) | No | '' |  |  |
| DisplayName | nvarchar(256) | No | '' |  |  |
| FieldValue | nvarchar(2048) | No | '' |  |  |
| IsDeleted | bit | No | 0 |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_QueueSessionFieldResult_SiteId_QueueSessionId | SiteId asc, QueueSessionId asc |  | No | No |  |

### QueueSessionNotification - T_Queue_QueueSessionNotification
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| SiteId | int | No |  |  |  |
| QueueId | uniqueidentifier | No |  |  |  |
| QueueSessionId | uniqueidentifier | No |  |  |  |
| From | nvarchar(256) | No | '' |  |  |
| To | nvarchar(256) | No | '' |  |  |
| NotificationType | smallint | No | 1 |  |  |
| ChannelType | smallint | No | 1 |  |  |
| Content | nvarchar(2048) | No | '' |  |  |
| SentTime | datetime2 | No |  |  |  |
| IsDeleted | bit | No | 0 |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_QueueSessionNotification_SiteId_QueueSessionId | SiteId asc, QueueSessionId asc |  | No | No |  |

## Reporting
### QueueSession - T_Queue_QueueSession
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No |  | Yes |  |
| QueueId | uniqueidentifier | No |  |  |  |
| ServiceAgentId | uniqueidentifier | No |  |  |  |
| Status | int | No |  |  |  |
| TimeFromCreatedToArrived | int | No |  |  | in seconds |
| TimeFromArrivedToEnded | int | No |  |  | in seconds |
| TimeFromCreatedToSummoned | int | No |  |  | in seconds |
| TimeFromSummonedToArrived | int | No |  |  | in seconds |
| OriginalEstimatedWaitingTime | int | No |  |  |  |
| EstimatedWaitingTime | int | No | Same as OriginalEstimatedWaitingTime |  |  |
| QueuePosition | int | No | 1 |  |  |
| CreatedTime | datetime2 | No |  |  |  |
| SummonedTime | datetime2 | No |  |  |  |
| ArrivedTime | datetime2 | No |  |  |  |
| NoShowTime | datetime2 | No |  |  |  |
| EndedTime | datetime2 | No |  |  |  |
| IsDeleted | bit | No | 0 |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_QueueSession_CreateTime_QueueId | CreateTime desc, QueueId asc |  | Yes | No |  |

### QueueSessionFieldResult - T_Queue_QueueSessionFieldResult
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| QueueSessionId | uniqueidentifier | No |  |  |  |
| FieldId | uniqueidentifier | No |  |  |  |
| FieldName | nvarchar(256) | No | '' |  |  |
| DisplayName | nvarchar(256) | No | '' |  |  |
| FieldValue | nvarchar(2048) | No | '' |  |  |
| IsDeleted | bit | No | 0 |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_QueueSessionFieldResult_QueueSessionId | QueueSessionId asc |  | No | No |  |