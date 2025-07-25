using BengleApi.Models;
using BengleApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BengleApi.Controllers
{
    [Route("api/players")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerService _playerService;
        
        public PlayerController(IPlayerService playerService)
        {
            _playerService = playerService;
        }
        
        [HttpGet]
        public ActionResult<IEnumerable<Player>> Get()
        {
            var players = _playerService.GetAllPlayers().
                    Select(p => new PlayerDto
                    {
                        Name = p.Name,
                        College = p.College,
                        Year = p.Year,
                        Position = p.Position,
                        Round = p.Round,
                        Pick = p.Pick
                    }).ToList();
            return Ok(players);
        }
    }
}
