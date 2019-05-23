using System;

namespace OnlineNotes.Model
{
	public class Note
	{
		public Guid Id { get; set; }
		public string Title { get; set; }
		public string Content { get; set; }
		public DateTime Created { get; set; }
		public DateTime LastModified { get; set; }
	}
}
