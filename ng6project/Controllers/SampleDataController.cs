using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ng6project.ViewModels;

namespace ng6project.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }

        //[HttpPost]
        //public IActionResult CreateToken([FromBody] LoginViewModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var results = new
        //        {
        //            token = "TESTING123", //TEMPORARY method
        //            expiration = DateTime.UtcNow.AddMinutes(30)
        //        };
        //        return Ok(results);

        //    }
        //    return BadRequest();
        //}
        [HttpPost("[action]")]
        [AllowAnonymous]
        public IActionResult CreateToken([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var results = new
                {
                    token = "TESTING123", //TEMPORARY method
                    expiration = DateTime.UtcNow.AddDays(1)
                };
                return Ok(results);

            }
            return BadRequest();
        }

    }
}
