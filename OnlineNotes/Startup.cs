using System;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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
			configuration = builder.Build();
		}

		// ConfigureServices is where you register dependencies. This gets
		// called by the runtime before the Configure method, below.
		public IServiceProvider ConfigureServices(IServiceCollection services)
		{
			// Add services to the collection.
			services.AddMvc();

			// Create the container builder.
			var builder = new ContainerBuilder();

			// Register dependencies, populate the services from
			// the collection, and build the container. If you want
			// to dispose of the container at the end of the app,
			// be sure to keep a reference to it as a property or field.

			//builder.RegisterType<MyType>().As<IMyType>();
			builder.Populate(services);
			applicationContainer = builder.Build();

			// Create the IServiceProvider based on the container.
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

			// If you want to dispose of resources that have been resolved in the
			// application container, register for the "ApplicationStopped" event.
			appLifetime.ApplicationStopped.Register(() => applicationContainer.Dispose());
		}
	}
}
