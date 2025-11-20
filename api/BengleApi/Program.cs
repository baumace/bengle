using BengleApi.Repositories;
using BengleApi.Services;
using Supabase;

namespace BengleApi;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Get the Supabase URL and Key from environment variables
        var url = Environment.GetEnvironmentVariable("SUPABASE_URL")?.Trim('\"');
        var key = Environment.GetEnvironmentVariable("SUPABASE_KEY")?.Trim('\"');
        
        // Log to console
        Console.WriteLine($"Supabase URL: {url}");
        Console.WriteLine($"Supabase Key: {key}");
        
        // Initialize Supabase
        var options = new SupabaseOptions
        {
            AutoRefreshToken = true,
            AutoConnectRealtime = true
        };
        var supabaseClient = new Client(url, key, options);
        await supabaseClient.InitializeAsync();
        builder.Services.AddSingleton<Client>(s => supabaseClient);
        
        // Add logging
        builder.Services.AddLogging(loggingBuilder =>
        {
            loggingBuilder.AddConsole();
            loggingBuilder.AddDebug();
        });

        // Add custom repositories to the container
        builder.Services.AddScoped<IPlayerRepository, PlayerRepository>();

        // Add custom services to the container
        builder.Services.AddScoped<IPlayerService, PlayerService>();

        // Add services to the container
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        
        // Add CORS policy
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAllOrigins",builder => builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
        });

        var app = builder.Build();
        
        // Use CORS policy
        app.UseCors("AllowAllOrigins");

        // Configure the HTTP request pipeline
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
