using Microsoft.EntityFrameworkCore;
using OnlineNotes.Model;

namespace OnlineNotes.Storage
{
	public class NotesDbContext : DbContext
	{
		public NotesDbContext(DbContextOptions options) : base(options)
		{
		}

		public DbSet<Note> Notes { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			modelBuilder.Entity<Note>()
				.HasIndex(b => b.UserId);
		}
	}
}
