using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace BengleApi.Models;

[Table("players")]
public class Player : BaseModel
{
    [PrimaryKey("id", false)]
    public long Id { get; set; }
    [Column("name")]
    public string? Name { get; set; }
    [Column("college")]
    public string? College { get; set; }
    [Column("year")]
    public int? Year { get; set; }
    [Column("position")]
    public string? Position { get; set; }
    [Column("round")]
    public int? Round { get; set; }
    [Column("pick")]
    public int? Pick { get; set; }

    public Player()
    {
        
    }
}