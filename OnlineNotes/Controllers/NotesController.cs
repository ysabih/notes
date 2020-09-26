using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OnlineNotes.Model;
using OnlineNotes.Storage;

namespace OnlineNotes.Controllers
{
	[Route("api/notes")]
	[Authorize]
	public class NotesController : Controller
	{
		private readonly NotesDbContext dbContext;

		public NotesController(ILogger<NotesController> logger, NotesDbContext dbContext)
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
			note.Created = note.LastModified = DateTime.UtcNow;
			note.UserId = GetUserId();

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
			string userId = GetUserId();
			using (dbContext)
			{
				try
				{
					Note note = await dbContext.Notes.SingleAsync(n => n.Id == id);
					if(note.UserId != userId)
					{
						return Forbid();
					}
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
			string userId = GetUserId();
			using (dbContext)
			{
				Note existingNote = await dbContext.Notes.SingleOrDefaultAsync(n => n.Id == id);
				if(existingNote == null || existingNote.UserId != userId)
				{
					return NotFound();
				}

				existingNote.Title = note.Title;
				existingNote.Content = note.Content;
				existingNote.LastModified = DateTime.UtcNow;

				await dbContext.SaveChangesAsync();
				return Ok(existingNote);
			}
		}

		[HttpDelete("{id:guid}")]
		public async Task<IActionResult> DeleteNoteAsync([FromRoute] Guid id)
		{
			string userId = GetUserId();
			using (dbContext)
			{
				Note existingNote = await dbContext.Notes.SingleOrDefaultAsync(n => n.Id == id);

				// Do not give unauthorized user information that a note with the provided id exists
				if (existingNote == null || existingNote.UserId != userId)
				{
					return NotFound();
				}

				dbContext.Notes.Remove(existingNote);
				await dbContext.SaveChangesAsync();
				return Ok();
			}
		}

		[HttpGet("")]
		public async Task<IActionResult> GetAllNotes()
		{
			string userId = GetUserId();
			using (dbContext)
			{
				return Ok(await dbContext.Notes.AsNoTracking().Where(note => note.UserId == userId).ToListAsync());
			}
		}

		private string GetUserId()
		{
			string userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
			if (string.IsNullOrEmpty(userId))
			{
				throw new ArgumentException("Accees token does not contain sub claim");
			}
			return userId;
		}
	}
}
