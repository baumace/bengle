using BengleApi.Models;

namespace BengleApi.Repositories;

public interface IPlayerRepository
{
    public Task<List<Player>> GetAllPlayersAsync();
}