using BengleApi.Models;

namespace BengleApi.Services;

public class PlayerService : IPlayerService
{
    private readonly Supabase.Client _supabaseClient;
    
    public PlayerService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient ?? throw new ArgumentNullException(nameof(supabaseClient));
    }
    
    public List<Player> GetAllPlayers()
    {
        return _supabaseClient.From<Player>().Get().Result.Models.ToList();
    }
}