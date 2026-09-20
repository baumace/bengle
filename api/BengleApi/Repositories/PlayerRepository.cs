using BengleApi.Models;
using Microsoft.Azure.Cosmos;

namespace BengleApi.Repositories;

public class PlayerRepository : IPlayerRepository
{
    private const string DatabaseId = "bengle";
    private const string ContainerId = "players";

    private readonly Container _container;
    private readonly ILogger<PlayerRepository> _logger;

    public PlayerRepository(CosmosClient cosmosClient, ILogger<PlayerRepository> logger)
    {
        ArgumentNullException.ThrowIfNull(cosmosClient);
        _container = cosmosClient.GetContainer(DatabaseId, ContainerId);
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<List<Player>> GetAllPlayersAsync()
    {
        try
        {
            var query = new QueryDefinition("SELECT * FROM c WHERE c.type = @type")
                .WithParameter("@type", "player");

            // Pairing the WHERE clause with an explicit PartitionKey lets the SDK route
            // straight to the single logical partition instead of fanning out to check others.
            var requestOptions = new QueryRequestOptions
            {
                PartitionKey = new PartitionKey("player")
            };

            var players = new List<Player>();
            using var iterator = _container.GetItemQueryIterator<Player>(query, requestOptions: requestOptions);
            while (iterator.HasMoreResults)
            {
                var response = await iterator.ReadNextAsync();
                players.AddRange(response);
            }

            return players;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching players from Cosmos DB");
            return new List<Player>();
        }
    }
}
