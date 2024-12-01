using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Swapzy.Domain.Entities;

namespace Swapzy.Infra.Data.Context;

public class SwapzyContext(DbContextOptions<SwapzyContext> options) : IdentityDbContext<User, Role, Guid>(options);