using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineNotes
{
	internal class AppConfig
	{
		public string MysqlConnectionString { get; set; }
		public string MysqlPassword { get; set; }
		public int MysqlConnectionPoolSize { get; set; }
		public string OidcAuthority { get; set; }
		public string OidcAudience { get; set; }
		public bool OidcRequireHttpsMetadata { get; set; }
	}
}
