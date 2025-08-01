using BengleApi.Models.Dtos;

namespace BengleApi.Services;

public interface IPlayerService
{
    public Task<List<PlayerDto>> GetAllPlayersAsync();
}