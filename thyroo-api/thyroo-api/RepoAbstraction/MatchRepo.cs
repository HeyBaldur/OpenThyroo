using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Data;
using thyroo_api.Dtos;
using thyroo_api.Models;
using thyroo_api.RepoInterfaces;

namespace thyroo_api.RepoAbstraction
{
    public class MatchRepo : IMatchRepo
    {
        private readonly DataContext _dataContext;
        public MatchRepo(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<MatchLogicDto> MatchLogic(int businessProfileId, int targetBusinessProfileId)
        {
            // Init object 
            MatchLogicDto logicToReturn = new MatchLogicDto();

            // Validate if the match exists
            var validateMatch = await _dataContext.Matches.FirstOrDefaultAsync(
                obj => (obj.BusinessProfileId == businessProfileId && obj.TargetBusinessProfileId == targetBusinessProfileId));

            // Validate if the user matched me
            var validateMatcher = await _dataContext.Matches.FirstOrDefaultAsync(
                obj => (obj.BusinessProfileId == targetBusinessProfileId && obj.TargetBusinessProfileId == businessProfileId));

            if (validateMatch == null || validateMatcher == null) // Match does not exists
            {
                // Validate if current user has already sent a match request
                if (validateMatch != null)
                    logicToReturn.MatchExists = true;
            }
            else
            {
                logicToReturn.Matched = true;
                if (validateMatch != null && validateMatcher != null)
                    logicToReturn.MatchExists = true;
            }

            return logicToReturn;
        }

        public async Task<MatchLogicResultDto> SendMatch(int userId, int businessProfileId, int targetBusinessProfileId)
        {
            // Init the match object
            MatchLogicResultDto result = new MatchLogicResultDto();

            // Validate if the match exists
            var validateMatch = await _dataContext.Matches.FirstOrDefaultAsync(
                obj => (obj.BusinessProfileId == businessProfileId && obj.TargetBusinessProfileId == targetBusinessProfileId));

            if (validateMatch == null)
            {
                Match match = new Match();
                match.BusinessProfileId = businessProfileId;
                match.TargetBusinessProfileId = targetBusinessProfileId;
                match.UserId = userId;
                await _dataContext.AddAsync(match);
                result.MatchSent = await _dataContext.SaveChangesAsync() > 0;

                // Check if it's match
                var searchResult = SearchMatch(businessProfileId, targetBusinessProfileId);
                result.IsMatched = searchResult;
            }

            // Default value
            return result;
        }

        public bool SearchMatch(int businessProfileId, int targetBusinessProfileId)
        {
            // Validate if the match exists
            var validateMatch = _dataContext.Matches.FirstOrDefault(
                obj => (obj.BusinessProfileId == businessProfileId && obj.TargetBusinessProfileId == targetBusinessProfileId));

            // Validate if the user matched me
            var validateMatcher = _dataContext.Matches.FirstOrDefault(
                obj => (obj.BusinessProfileId == targetBusinessProfileId && obj.TargetBusinessProfileId == businessProfileId));

            if (validateMatch != null && validateMatcher != null)
                return true;

            return false;
        }

        public async Task<bool> RemoveMatch(int businessProfileId, int targetBusinessProfileId)
        {
            // Validate if the match exists
            var matchItem = await _dataContext.Matches.SingleOrDefaultAsync(
                obj => (obj.BusinessProfileId == businessProfileId && obj.TargetBusinessProfileId == targetBusinessProfileId));

            // Remove match
            _dataContext.Matches.Remove(matchItem);

            // Save results
            var result = await _dataContext.SaveChangesAsync() > 0;

            // Return value
            return result;
        }
    }
}
