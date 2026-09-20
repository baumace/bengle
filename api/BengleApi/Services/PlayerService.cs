using BengleApi.Models.Dtos;
using BengleApi.Repositories;
using Microsoft.Extensions.Caching.Memory;

namespace BengleApi.Services;

public class PlayerService : IPlayerService
{
    private const string CacheKey = "players";
    private static readonly TimeSpan CacheDuration = TimeSpan.FromMinutes(30);

    private readonly IPlayerRepository _playerRepository;
    private readonly IMemoryCache _cache;
    private readonly ILogger<PlayerService> _logger;

    public PlayerService(IPlayerRepository playerRepository, IMemoryCache cache, ILogger<PlayerService> logger)
    {
        _playerRepository = playerRepository ?? throw new ArgumentNullException(nameof(playerRepository));
        _cache = cache ?? throw new ArgumentNullException(nameof(cache));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<List<PlayerDto>> GetAllPlayersAsync()
    {
        if (_cache.TryGetValue(CacheKey, out List<PlayerDto>? cached) && cached is not null)
        {
            return cached;
        }

        var players = await _playerRepository.GetAllPlayersAsync();

        if (!players.Any())
        {
            _logger.LogWarning("No players found in the database.");
            return new List<PlayerDto>();
        }

        var dtos = players.Select(p => new PlayerDto
        {
            Name = p.Name,
            College = p.College,
            Year = p.Year,
            Position = p.Position,
            Round = p.Round,
            Pick = p.Pick
        }).ToList();

        // Don't cache an empty result, so a transient failure/misconfiguration
        // doesn't get pinned as "no players" for the full cache duration.
        _cache.Set(CacheKey, dtos, CacheDuration);

        return dtos;
    }
}
