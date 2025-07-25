using BengleApi.Services;
using Supabase;

namespace BengleApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            
            // Initialize Supabase
            var url = Environment.GetEnvironmentVariable("SUPABASE_URL")?.Trim('\"');
            var key = Environment.GetEnvironmentVariable("SUPABASE_KEY")?.Trim('\"');
            var options = new SupabaseOptions
            {
                AutoRefreshToken = true,
                AutoConnectRealtime = true
            };
            var supabaseClient = new Client(url, key, options);
            supabaseClient.InitializeAsync().Wait();
            builder.Services.AddSingleton<Client>(s => supabaseClient);

            // Add custom services to the container
            builder.Services.AddTransient<IPlayerService, PlayerService>();

            // Add services to the container
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

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
}