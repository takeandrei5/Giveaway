using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Application.Interfaces;

public interface ILoggedUser
{
    string GetEmailFromToken();
}
