using BengleApi.Models;

namespace BengleApi.Services;

public class PlayerService : IPlayerService
{
    public PlayerService()
    {
    }
    
    public List<Player> GetAllPlayers()
    {
        return new List<Player>
        {
            new Player
            {
                Name = "Joe Burrow",
                College = "LSU",
                Year = 2020,
                Position = "QB",
                Round = 1,
                Pick = 1
            }
        };
    }
}