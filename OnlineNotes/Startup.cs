using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MySql.Data.MySqlClient;
using OnlineNotes.Storage;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Microsoft.AspNetCore.HttpOverrides;

namespace OnlineNotes
{
	public class Startup
	{
		private readonly IConfigurationRoot configuration;

		public Startup(IWebHostEnvironment env)
		{
			var builder = new ConfigurationBuilder()
				.SetBasePath(env.ContentRootPath)
				.AddJsonFile("appsettings.json");

			configuration = builder.Build();
		}

		// ConfigureServices is where you register dependencies. This gets
		// called by the runtime before the Configure method, below.
		public void ConfigureServices(IServiceCollection services)
		{
			// Add services to the collection.
			services.AddMvc(options =>
			{
				options.Filters.Add<SlowDownActionFilter>();
			}).AddNewtonsoftJson();

			services.AddCors(options => {
				options.AddPolicy("default",
				builder =>
				{
					builder.AllowAnyOrigin()
						   .AllowAnyHeader()
						   .AllowAnyMethod();
				});
			});

			AppConfig appConfig = ReadConfig(configuration);

			var connectionStringBuilder = new MySqlConnectionStringBuilder()
			{
				ConnectionString = appConfig.MysqlConnectionString,
				Password = appConfig.MysqlPassword
			};
			services.AddDbContext<NotesDbContext>(options => options.UseMySql(connectionStringBuilder.ConnectionString, mySqlOptions =>
			{
				mySqlOptions.ServerVersion(new Version(5, 7), ServerType.MySql);
			}));

			services.AddAuthentication("Bearer")
			.AddJwtBearer("Bearer", options =>
			{
				options.Authority = appConfig.OidcAuthority;
				options.Audience = appConfig.OidcAudience;

				options.RequireHttpsMetadata = appConfig.OidcRequireHttpsMetadata;
			});
		}

		// Configure is where you add middleware. This is called after
		// ConfigureServices. You can use IApplicationBuilder.ApplicationServices
		// here if you need to resolve things from the container.
		public void Configure(
		  IApplicationBuilder app)
		{
			app.UseForwardedHeaders(new ForwardedHeadersOptions
			{
				ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
			});

			app.UseCors("default");
			app.UseRouting();

			app.UseAuthentication();
			app.UseAuthorization();

			app.UseEndpoints(routes =>
			{
				routes.MapControllers();
			});
		}

		private AppConfig ReadConfig(IConfigurationRoot config)
		{
			return new AppConfig
			{
				MysqlConnectionString = ReadStringFromConfig(config, "MysqlConnectionString"),
				MysqlPassword = ReadStringFromConfig(config, "MysqlPassword"),

				OidcAuthority = ReadStringFromConfig(config, "OidcAuthority"),
				OidcAudience = ReadStringFromConfig(config, "OidcAudience"),
				OidcRequireHttpsMetadata = ReadBoolFromConfig(config, "OidcRequireHttpsMetadata"),
			};
		}

		private string ReadStringFromConfig(IConfigurationRoot config, string configName)
		{
			string res = config[configName];
			if (string.IsNullOrEmpty(res))
			{
				throw new ArgumentException($"Config {configName} cannot be empty");
			}
			return res;
		}

		private bool ReadBoolFromConfig(IConfigurationRoot config, string configName)
		{
			string res = ReadStringFromConfig(config, configName);
			return bool.Parse(res);
		}
	}
}
