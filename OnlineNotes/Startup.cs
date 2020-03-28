using System;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MySql.Data.MySqlClient;
using OnlineNotes.Model;
using OnlineNotes.Storage;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace OnlineNotes
{
	public class Startup
	{
		private readonly IConfigurationRoot configuration;

		public Startup(IWebHostEnvironment env)
		{
			var builder = new ConfigurationBuilder()
				.SetBasePath(env.ContentRootPath)
				.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
				.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
				.AddEnvironmentVariables();
			if (env.IsDevelopment())
			{
				builder.AddUserSecrets<Startup>();
			}

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
				options.AddDefaultPolicy(
				builder =>
				{
					builder.AllowAnyOrigin();
				});
			});

			var connectionStringBuilder = new MySqlConnectionStringBuilder()
			{
				ConnectionString = configuration["Mysql:ConnectionString"],
				Password = configuration["Mysql:Password"]
			};
			services.AddDbContext<ApplicationDbContext>(options => options.UseMySql(connectionStringBuilder.ConnectionString, mySqlOptions =>
			{
				mySqlOptions.ServerVersion(new Version(5, 7), ServerType.MySql);
			}));

			services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = false)
				.AddEntityFrameworkStores<ApplicationDbContext>();

			services.AddIdentityServer()
				.AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

			services.AddAuthentication()
				.AddIdentityServerJwt();

		}

		// Configure is where you add middleware. This is called after
		// ConfigureServices. You can use IApplicationBuilder.ApplicationServices
		// here if you need to resolve things from the container.
		public void Configure(
		  IApplicationBuilder app)
		{
			app.UseCors();
			app.UseRouting();

			app.UseAuthentication();
			app.UseIdentityServer();
			app.UseAuthorization();

			app.UseEndpoints(routes =>
			{
				routes.MapControllers();
			});
		}
	}
}
