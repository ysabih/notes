using System;
using System.ComponentModel.DataAnnotations;

namespace OnlineNotes.Model
{
	public class Note
	{
		public Guid Id { get; set; }
		[Required]
		public string UserId { get; set; }
		public string Title { get; set; }
		public string Content { get; set; }
		public DateTime Created { get; set; }
		public DateTime LastModified { get; set; }
	}
}
