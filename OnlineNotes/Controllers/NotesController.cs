using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using OnlineNotes.Model;
using OnlineNotes.Storage;

namespace OnlineNotes.Controllers
{
	[Route("api/notes")]
	public class NotesController : Controller
	{
		private readonly NotesDbContext dbContext;

		public NotesController(ILogger<NotesController> logger, IConfiguration configuration, NotesDbContext dbContext)
		{
			this.dbContext = dbContext;
		}

		[HttpPost("")]
		public async Task<IActionResult> CreateNoteAsync([FromBody] Note note)
		{
			if (note == null)
			{
				return BadRequest("Note object is null");
			}

			note.Id = Guid.NewGuid();
			note.Created = note.LastModified = DateTime.Now;
			using (dbContext)
			{
				await dbContext.Notes.AddAsync(note);
				await dbContext.SaveChangesAsync();
			}

			string url = $"{Request.Scheme}://{Request.Host}{Request.PathBase}/api/notes/{note.Id}";

			return Created(url, note);
		}

		[HttpGet("{id:guid}")]
		public async Task<IActionResult> GetNoteAsync([FromRoute] Guid id)
		{
			using (dbContext)
			{
				try
				{
					Note note = await dbContext.Notes.SingleAsync(n => n.Id == id);
					return Ok(note);
				}
				catch (InvalidOperationException)
				{
					return NotFound();
				}
			}

		}

		[HttpPut("{id:guid}")]
		public async Task<IActionResult> ModifyNoteAsync([FromRoute] Guid id, [FromBody] Note note)
		{
			using (dbContext)
			{
				Note existingNote;
				try
				{
					existingNote = await dbContext.Notes.SingleAsync(n => n.Id == id);
				}
				catch (InvalidOperationException)
				{
					return NotFound();
				}

				existingNote.Title = note.Title;
				existingNote.Content = note.Content;
				existingNote.LastModified = DateTime.Now;

				await dbContext.SaveChangesAsync();
				return Ok(existingNote);
			}
		}

		[HttpGet("")]
		public async Task<IActionResult> GetAllNotes()
		{
			using (dbContext)
			{
				return Ok(await dbContext.Notes.ToListAsync());
			}
		}
	}
}
