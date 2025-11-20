using BengleApi.Models;
using Supabase;

namespace BengleApi.Repositories;

public class PlayerRepository : IPlayerRepository
{
    private readonly Client _supabaseClient;
    private readonly ILogger<PlayerRepository> _logger;

    public PlayerRepository(Client supabaseClient, ILogger<PlayerRepository> logger)
    {
        _supabaseClient = supabaseClient ?? throw new ArgumentNullException(nameof(supabaseClient));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<List<Player>> GetAllPlayersAsync()
    {
        try
        {
            var response = await _supabaseClient.From<Player>().Get();
            return response.Models.ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching players from Supabase");
            return new List<Player>();
        }
    }
}
