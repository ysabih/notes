using System.Threading;
using Microsoft.AspNetCore.Mvc.Filters;

namespace OnlineNotes
{
	// Used to slow down requests in order to test client behavior
	internal class SlowDownActionFilter : ActionFilterAttribute
	{
		public override void OnActionExecuted(ActionExecutedContext context)
		{
			Thread.Sleep(1000);
		}
	}
}
