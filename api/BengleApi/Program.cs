using Azure.Identity;
using BengleApi.Repositories;
using BengleApi.Services;
using Microsoft.Azure.Cosmos;

namespace BengleApi;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddSingleton(CreateCosmosClient(builder.Configuration));

        // Add logging
        builder.Services.AddLogging(loggingBuilder =>
        {
            loggingBuilder.AddConsole();
            loggingBuilder.AddDebug();
        });

        builder.Services.AddMemoryCache();

        // Add custom repositories to the container
        builder.Services.AddScoped<IPlayerRepository, PlayerRepository>();

        // Add custom services to the container
        builder.Services.AddScoped<IPlayerService, PlayerService>();

        // Add services to the container
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // Add CORS policy
        var allowedOrigins = builder.Configuration["Cors:AllowedOrigins"]
            ?.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            ?? ["http://localhost:3000"];

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowConfiguredOrigins", policy => policy
                .WithOrigins(allowedOrigins)
                .AllowAnyMethod()
                .AllowAnyHeader());
        });

        var app = builder.Build();

        // Use CORS policy
        app.UseCors("AllowConfiguredOrigins");

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

    private static CosmosClient CreateCosmosClient(IConfiguration configuration)
    {
        var endpoint = configuration["Cosmos:Endpoint"]
            ?? throw new InvalidOperationException("Cosmos:Endpoint configuration is required.");

        var clientOptions = new CosmosClientOptions
        {
            SerializerOptions = new CosmosSerializationOptions
            {
                PropertyNamingPolicy = CosmosPropertyNamingPolicy.CamelCase
            }
        };

        var key = configuration["Cosmos:Key"];
        if (!string.IsNullOrEmpty(key))
        {
            // Local dev only — the deployed Container App authenticates via managed identity instead.
            return new CosmosClient(endpoint, key, clientOptions);
        }

        // ManagedIdentityCredential (not the broader DefaultAzureCredential chain) avoids
        // probing unused credential types on every cold start, since this app scales to zero.
        return new CosmosClient(endpoint, new ManagedIdentityCredential(ManagedIdentityId.SystemAssigned), clientOptions);
    }
}
