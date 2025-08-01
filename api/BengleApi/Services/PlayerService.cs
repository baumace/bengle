using BengleApi.Models.Dtos;
using BengleApi.Repositories;

namespace BengleApi.Services;

public class PlayerService : IPlayerService
{
    private readonly IPlayerRepository _playerRepository;
    private readonly ILogger<PlayerService> _logger;

    public PlayerService(IPlayerRepository playerRepository, ILogger<PlayerService> logger)
    {
        _playerRepository = playerRepository ?? throw new ArgumentNullException(nameof(playerRepository));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<List<PlayerDto>> GetAllPlayersAsync()
    {
        var players = await _playerRepository.GetAllPlayersAsync();

        if (!players.Any())
        {
            _logger.LogWarning("No players found in the database.");
            return new List<PlayerDto>();
        }
        
        return players.Select(p => new PlayerDto
        {
            Name = p.Name,
            College = p.College,
            Year = p.Year,
            Position = p.Position,
            Round = p.Round,
            Pick = p.Pick
        }).ToList();
    }
}