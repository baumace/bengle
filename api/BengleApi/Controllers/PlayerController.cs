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
        public IEnumerable<Player> Get()
        {
            return _playerService.GetAllPlayers();
        }
    }
}
