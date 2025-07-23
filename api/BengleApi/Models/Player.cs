namespace BengleApi.Models;

public class Player
{
    public required string Name { get; set; }
    public required string College { get; set; }
    public required int Year { get; set; }
    public required string Position { get; set; }
    public required int Round { get; set; }
    public required int Pick { get; set; }
}