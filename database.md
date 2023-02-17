
## Partner
### QueueLanguageItem - T_Queue_LanguageItem
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| PartnerId | int | No |  |  |  |
| Language | smallint | No |  |  |  |
| Category | smallint | No |  |  | 'Location'、'Queue' |
| SystemName | nvarchar(256) | No |  |  | Identity Name, As Enum in Code |
| Name | nvarchar(256) | No |  |  | Display Name |
| DefaultText | nvarchar(MAX) | No |  |  |  |
| Macros | nvarchar(2048) | No |  |  |  |
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
| Language | smallint | No |  |  |  |
| NotificationType | smallint | No |  |  |  |
| ChannelType | smallint | No | 'SMS' |  |  |
| SystemName | nvarchar(256) | No |  |  | Identity Name, As Enum in Code |
| Name | nvarchar(256) | No |  |  | Display Name |
| DefaultText | nvarchar(MAX) | No |  |  |  |
| Macros | nvarchar(2048) | No |  |  |  |
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
| Name | nvarchar(256) | No |  |  |  |
| Logo | nvarbinary(MAX) | No |  |  |  |
| ThemeColor | nvarchar(32) | No | '#329FD9' |  |  |
| GreetingMessage | **virtual** | No |  |  | LocationLanguageItem |
| IsDeleted | bit | No | 0 |  |  |
| RowVersion | timestamp | No |  |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_Location_SiteId | SiteId Asc |  | No | No |  |

### LocationLanguageConfig - T_Queue_LocationLanguageConfig
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| SiteId | int | No |  |  |  |  |
| LocationId | uniqueidentifier | No |  |  |  |  |
| Language | smallint | No |  |  |  |
| IsDeleted | bit | No | 0 |  |  |
| RowVersion | timestamp | No |  |  |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_LocationLanguageConfig_SiteId_LocationId | SiteId asc, LocationId asc |  | No | No |  |

### LocationLanguageItem - T_Queue_LocationLanguageItem
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| SiteId | int | No |  |  |  |  |
| LocationId | uniqueidentifier | No |  |  |  |  |
| SystemName | nvarchar(256) | No |  |  |  | Identity Name |
| Text | nvarchar(MAX) | No | '' |  |  |  |
| IsDeleted | bit | No | 0 |  |  |
| RowVersion | timestamp | No |  |  |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_LocationLanguageItem_SiteId_LocationId | SiteId asc, LocationId asc |  | No | No |  |

### Queue - T_Queue_Queue
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| SiteId | int | No |  |  |  |
| LocationId | uniqueidentifier | No |  |  |  |
| Name | nvarchar(256) | No |  |  |  |
| Description | nvarchar(2048) | No |  |  |  |
| TimeZone | nvarchar(64) | No | {Site.TimeZone} |  | Windows TimeZone Name |
| IsClosed | bit | No | 0 |  |  |
| IsStatusManuallyControlled | bit | No | 0 |  |  |
| InitialServeDuration | int | No | 30 |  | in Minutes |
| ServingAgentCount | int | No |  |  |  |
| SummonToExpiredTime | int | No | 15 |  | in Minutes, 0 means not expire |
| ExpiredToRemovedTime | int | No | 60 |  | in Minutes |
| AboutToStartNotificationMinutes | int | No | 10 |  | in Minutes |
| GreetingMessage | **virtual** | No |  |  | from QueueLanguageItem |
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
| SystemName | nvarchar(256) | No |  |  |  | Identity Name |
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
| SystemName | nvarchar(256) | No |  |  | Identity Name |
| Text | nvarchar(MAX) | No |  |  |  |
| IsDeleted | bit | No | 0 |  |  |
| RowVersion | timestamp | No |  |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_QueueNotificationTemplate_SiteId_QueueId_SystemName | SiteId asc, QueueId asc, SystemName asc |  | No | No |  |

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
| Name | nvarchar(256) | No |  |  | Identity Name |
| DisplayName | nvarchar(256) | No |  |  | Display Name |
| Type | int | No | 1 |  |  |
| Order | int | No | 1 |  | Start from 1 |
| IsSystem | bit | No | 0 |  |  |
| IsRequired | bit | No | 0 |  |  |
| IsVisible | bit | No | 1 |  |  |
| Options | nvarchar(MAX) | No |  |  |  |
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
| Value | nvarchar(256) | No |  |  |  |
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
| DayOfWeek | nvarchar(128) | No | 'Monday' |  |  |
| StartTime | datetime | No |  |  |  |
| EndTime | datetime | No |  |  |  |
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
| Name | nvarchar(256) | No |  |  |  |
| Date | datetime | No |  |  |  |
| IsDeleted | bit | No | 0 |  |  |
| RowVersion | timestamp | No |  |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_Holiday_SiteId_QueueId | SiteId asc, QueueId asc |  | No | No |  |

### SMSIntegrationConfig - T_Queue_SMSIntegrationConfig
| Name | Type | Nullable | Default Value | Is Primary Key | Remark |
|--|--|--|--|--|--|
| Id | uniqueidentifier | No | NEWID() | Yes |  |
| SiteId | int | No |  |  |  |
| GatewayProvider | nvarchar(256) | No | 'Twilio' |  |  |
| AuthorizeUrl | nvarchar(2048) | No |  |  |  |
| GrantType | smallint | No |  |  |  |
| AccessKey | nvarchar(4096) | No |  |  |  |
| RefreshToken | nvarchar(4096) | No |  |  |  |
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
| ServiceAgentId | uniqueidentifier | No |  |  |  |
| Status | int | No |  |  |  |
| OriginalEstimatedWaitingTime | int | No |  |  |  |
| CurrentEstimatedWaitingTime | int | No | Same as OriginalEstimatedWaitingTime |  |  |
| CurrentQueuePosition | int | No |  |  |  |
| CreatedTime | datetime | No |  |  |  |
| SummonedTime | datetime | No |  |  |  |
| ArrivedTime | datetime | No |  |  |  |
| ExpiredTime | datetime | No |  |  |  |
| EndedTime | datetime | No |  |  |  |
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
| FieldName | nvarchar(256) | No |  |  |  |
| DisplayName | nvarchar(256) | No |  |  |  |
| FieldValue | nvarchar(2048) | No |  |  |  |
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
| From | nvarchar(256) | No |  |  |  |
| To | nvarchar(256) | No |  |  |  |
| NotificationType | smallint | No |  |  |  |
| ChannelType | smallint | No | 'SMS' |  |  |
| Content | nvarchar(2048) | No |  |  |  |
| SentTime | datetime | No |  |  |  |
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
| SiteId | int | No |  |  |  |
| QueueId | uniqueidentifier | No |  |  |  |
| ServiceAgentId | uniqueidentifier | No |  |  |  |
| Status | int | No |  |  |  |
| TimeToEndedFromArrived | int | No |  |  | in seconds |
| TimeToArrivedFromCreated | int | No |  |  | in seconds |
| TimeToSummonedFromCreated | int | No |  |  | in seconds |
| TimeToArrivedFromSummoned | int | No |  |  | in seconds |
| OriginalEstimatedWaitingTime | int | No |  |  |  |
| CreatedTime | datetime | No |  |  |  |
| SummonedTime | datetime | No |  |  |  |
| ArrivedTime | datetime | No |  |  |  |
| ExpiredTime | datetime | No |  |  |  |
| EndedTime | datetime | No |  |  |  |
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
| FieldName | nvarchar(256) | No |  |  |  |
| DisplayName | nvarchar(256) | No |  |  |  |
| FieldValue | nvarchar(2048) | No |  |  |  |
| IsDeleted | bit | No | 0 |  |  |

#### Index
| Name | Colomns(Order) | Includes | Is Clustered | Is Unique | Remark |
|--|--|--|--|--|--|
| IX_T_Queue_QueueSessionFieldResult_SiteId_QueueSessionId | SiteId asc, QueueSessionId asc |  | No | No |  |