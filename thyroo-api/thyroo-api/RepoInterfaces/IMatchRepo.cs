using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Dtos;

namespace thyroo_api.RepoInterfaces
{
    public interface IMatchRepo
    {
        // Validate if the match exists between both users
        // Validate if current user hit match button
        Task<MatchLogicDto> MatchLogic(int businessProfileId, int targetBusinessProfileId);
        Task<MatchLogicResultDto> SendMatch(int userId, int businessProfileId, int targetBusinessProfileId); // Create a match
        Task<bool> RemoveMatch(int businessProfileId, int targetBusinessProfileId); // Create a match
    }
}
