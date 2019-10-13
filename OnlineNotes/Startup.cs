using System;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MySql.Data.MySqlClient;
using OnlineNotes.Storage;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace OnlineNotes
{
	public class Startup
	{
		private IContainer applicationContainer;
		private readonly IConfigurationRoot configuration;

		public Startup(IHostingEnvironment env)
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
		public IServiceProvider ConfigureServices(IServiceCollection services)
		{
			// Add services to the collection.
			services.AddMvc(options =>
			{
				options.Filters.Add<SlowDownActionFilter>();
			});
			services.AddCors(options =>
			{
				options.AddPolicy("Allow React client requests",
					policyOptions =>
					{
						policyOptions.WithOrigins("http://localhost:3000").SetIsOriginAllowed((policy) => true);
					});
			});

			var connectionStringBuilder = new MySqlConnectionStringBuilder()
			{
				ConnectionString = configuration["Mysql:ConnectionString"],
				Password = configuration["Mysql:Password"]
			};
			services.AddDbContext<NotesDbContext>(options => options.UseMySql(connectionStringBuilder.ConnectionString, mySqlOptions =>
			{
				mySqlOptions.ServerVersion(new Version(5, 7), ServerType.MySql);
			}));
			
			var builder = new ContainerBuilder();
			builder.Populate(services);
			builder.RegisterInstance(configuration).As<IConfiguration>();

			applicationContainer = builder.Build();
			return new AutofacServiceProvider(applicationContainer);
		}

		// Configure is where you add middleware. This is called after
		// ConfigureServices. You can use IApplicationBuilder.ApplicationServices
		// here if you need to resolve things from the container.
		public void Configure(
		  IApplicationBuilder app,
		  IApplicationLifetime appLifetime)
		{
			app.UseMvc();
			app.UseCors();
			// If you want to dispose of resources that have been resolved in the
			// application container, register for the "ApplicationStopped" event.
			appLifetime.ApplicationStopped.Register(() => applicationContainer.Dispose());
		}
	}
}
