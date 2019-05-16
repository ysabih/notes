using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace OnlineNotes.Controllers
{
	[Route("api/notes")]
	public class NotesController : Controller
	{
		private readonly ILogger<NotesController> logger;

		public NotesController(ILogger<NotesController> logger)
		{
			this.logger = logger;
		}
	}
}
