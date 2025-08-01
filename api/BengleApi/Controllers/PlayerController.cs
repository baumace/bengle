using System.Diagnostics;
using BengleApi.Models;
using BengleApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BengleApi.Controllers;

[Route("api/players")]
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
    public ActionResult<IEnumerable<Player>> Get()
    {
        var stopwatch = Stopwatch.StartNew();
        var result = _playerService.GetAllPlayersAsync().Result;
        stopwatch.Stop();
        
        _logger.LogInformation($"Get players executed in {stopwatch.ElapsedMilliseconds}ms");

        return Ok(result);
    }
}