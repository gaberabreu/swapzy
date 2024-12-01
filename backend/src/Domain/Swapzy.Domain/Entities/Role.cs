using Microsoft.AspNetCore.Identity;

namespace Swapzy.Domain.Entities;

public class Role : IdentityRole<Guid>
{
    public Role()
    {
    }

    public Role(string roleName) : base(roleName)
    {
    }
};