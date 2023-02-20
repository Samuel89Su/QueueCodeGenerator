#   Queue 系统分析与设计
1.  应用模块拆分
2.  模块间交互
3.  数据流
4.  业务流程

##  应用模块
1. Migrator - Comm100.Register.Site, Comm100.Register.Partner
   1. 升级脚本, Center, General/Site, Reporting 建表
      1. 业务表建表
      2. Product/Plan/Feature/Role/Permission/AuditLogActionType......
      3. Default Location 初始化
   2. 注册脚本
2. RegisterAPI
   1. Partner 库建表
   2. Ganeral/Site 库建表
   3. Default Location 初始化
3. EntityDataReciver
   1. Reporting 库建表
4. SqlScripts(发布后合并到 master) - 迁移建表
5. AutoCodingDB - Decoupling
   1. Entity 配置
   2. API 配置
6. QueueAPI -   Decoupling
   1. ControlPanel API - AutoCodingAPI & CustomAPI & CustomEvent
   2. Visitor API
      1. Join
      2. Status
   3. AgentConsole API
7. QueuePersistence？？？
   1. 转移持久化数据到 Reporting 库
8. ReportingQuery???
   1. RealTime/Today 报表是否从 ReportingQuery 输出
9. QueueService
    1.  SMS(Twilio)集成
    2.  Background Workers
    3.  AboutToStart 检测
    4.  Remove Expired Visitor from Queue
    5.  Remove all from Queue before next working hour
    6.  事件与通知解耦

## Tasks
1. 应用模块数据库权限
