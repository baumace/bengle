using System.Diagnostics;
using BengleApi.Models.Dtos;
using BengleApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BengleApi.Controllers;

[Route("bengle/api/players")]
[ApiController]
public class PlayerController : ControllerBase
{
    private readonly IPlayerService _playerService;
    private readonly ILogger<PlayerController> _logger;

    public PlayerController(IPlayerService playerService, ILogger<PlayerController> logger)
    {
        _playerService = playerService ?? throw new ArgumentNullException(nameof(playerService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PlayerDto>>> Get()
    {
        var stopwatch = Stopwatch.StartNew();
        var result = await _playerService.GetAllPlayersAsync();
        stopwatch.Stop();
        
        _logger.LogInformation($"Get players executed in {stopwatch.ElapsedMilliseconds}ms");

        return Ok(result);
    }
}
