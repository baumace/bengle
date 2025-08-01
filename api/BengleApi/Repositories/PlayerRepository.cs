using BengleApi.Models;
using Supabase;

namespace BengleApi.Repositories;

public class PlayerRepository : IPlayerRepository
{
    private readonly Client _supabaseClient;

    public PlayerRepository(Client supabaseClient)
    {
        _supabaseClient = supabaseClient ?? throw new ArgumentNullException(nameof(supabaseClient));
    }

    public async Task<List<Player>> GetAllPlayersAsync()
    {
        var response = await _supabaseClient.From<Player>().Get();
        return response.Models.ToList();
    }
}