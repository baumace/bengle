using BengleApi.Models;

namespace BengleApi.Services;

public class PlayerService : IPlayerService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;
    
    public PlayerService(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
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