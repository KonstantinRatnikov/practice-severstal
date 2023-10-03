using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;

using Microsoft.AspNetCore.Hosting;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogInController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public LogInController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpPut]
        public JsonResult Put(Employee emp)
        {
            string hashedPassword = HashPasswordClass.HashPassword(emp.password);
            string query = @"select id, password
                        from dbo.EmployeePasswords 
                        where id = '" + emp.id + @"' and password = '" + hashedPassword + @"'";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            bool isLoginSuccessful = false;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;
                    if (table.Rows.Count == 1)
                    {
                        isLoginSuccessful = true;
                    }
                    myReader.Close();
                    myCon.Close();
                }
            }

            if (isLoginSuccessful)
            {
                return new JsonResult("Вход выполнен");
            }
            else
            {
                return new JsonResult("Неверный ID или пароль");
            }
        }
    }
}
