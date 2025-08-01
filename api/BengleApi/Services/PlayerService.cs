using BengleApi.Models.Dtos;
using BengleApi.Repositories;

namespace BengleApi.Services;

public class PlayerService : IPlayerService
{
    private readonly IPlayerRepository _playerRepository;

    public PlayerService(IPlayerRepository playerRepository)
    {
        _playerRepository = playerRepository ?? throw new ArgumentNullException(nameof(playerRepository));
    }

    public async Task<List<PlayerDto>> GetAllPlayersAsync()
    {
        var players = await _playerRepository.GetAllPlayersAsync();
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