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
	}
}
