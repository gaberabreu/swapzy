using Microsoft.AspNetCore.Identity;

namespace Swapzy.Core.UserAggregate;

public class ApplicationUser : IdentityUser<Guid> 
{
    public ApplicationUser()
    {
    }
}
