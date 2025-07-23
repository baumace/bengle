using BengleApi.Models;

namespace BengleApi.Services;

public interface IPlayerService
{
    List<Player> GetAllPlayers();
}