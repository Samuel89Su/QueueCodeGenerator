using LiveChat.Domain.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace QueueEntities
{
    /// <summary>
    /// #TableName#
    /// </summary>
    [Table(Consts.TABLE_#upperClassName#, Schema = Consts.SCHEMA_#schema#)]
    public class #className#
    {
#props#
    }
}