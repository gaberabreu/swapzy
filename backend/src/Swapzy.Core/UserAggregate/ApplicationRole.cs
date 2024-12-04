using Microsoft.AspNetCore.Identity;

namespace Swapzy.Core.UserAggregate;

public class ApplicationRole : IdentityRole<Guid> 
{
    public ApplicationRole()
    {
    }
}