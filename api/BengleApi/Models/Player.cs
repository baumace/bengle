namespace BengleApi.Models;

public class Player
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Type { get; set; } = "player";
    public string? Name { get; set; }
    public string? College { get; set; }
    public int? Year { get; set; }
    public string? Position { get; set; }
    public int? Round { get; set; }
    public int? Pick { get; set; }
}
