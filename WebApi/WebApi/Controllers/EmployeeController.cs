using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebApi.Models;
using Microsoft.AspNetCore.Hosting;
using System;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public EmployeeController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                SELECT id, first_name, last_name, hire_date, phone_number
                FROM Employee;
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Employee emp)
        {
            string hashedPassword = HashPasswordClass.HashPassword(emp.password);

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;

            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();

                // Создание команды SQL для вставки данных пользователя в таблицу Users
                string insertUserQuery = "INSERT INTO dbo.Employee (first_name, last_name, hire_date, phone_number) VALUES (@first_name, @last_name, @hire_date, @phone_number); SELECT SCOPE_IDENTITY();";
                using (SqlCommand command = new SqlCommand(insertUserQuery, connection))
                {
                    command.Parameters.AddWithValue("@first_name", emp.first_name);
                    command.Parameters.AddWithValue("@last_name", emp.last_name);
                    command.Parameters.AddWithValue("@hire_date", emp.hire_date);
                    command.Parameters.AddWithValue("@phone_number", emp.phone_number);

                    // Выполнение команды вставки данных и получение сгенерированного идентификатора UserID
                    int userID = Convert.ToInt32(command.ExecuteScalar());

                    // Создание команды SQL для вставки хэшированного пароля в таблицу Passwords
                    string insertPasswordQuery = "INSERT INTO dbo.EmployeePasswords (id, password) VALUES (@UserID, @hashedPassword)";
                    using (SqlCommand passwordCommand = new SqlCommand(insertPasswordQuery, connection))
                    {
                        passwordCommand.Parameters.AddWithValue("@UserID", userID);
                        passwordCommand.Parameters.AddWithValue("@hashedPassword", hashedPassword);

                        // Выполнение команды вставки хэшированного пароля
                        passwordCommand.ExecuteNonQuery();
                    }
                }

                connection.Close();
            }



            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Employee emp)
        {
 
            string query = @"
                    update dbo.Employee set 
                    first_name = '" + emp.first_name + @"' 
                    ,last_name = '" + emp.last_name + @"'
                    ,hire_date = '" + emp.hire_date + @"'
                    ,phone_number = '" + emp.phone_number + @"'
                    where id = " + emp.id + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {

            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");

            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();

                // Удаление пароля пользователя из таблицы EmployeePasswords
                string deletePasswordQuery = "DELETE FROM EmployeePasswords WHERE id = @UserId";
                using (SqlCommand passwordCommand = new SqlCommand(deletePasswordQuery, connection))
                {
                    passwordCommand.Parameters.AddWithValue("@UserId", id);

                    // Выполнение команды удаления пароля
                    passwordCommand.ExecuteNonQuery();
                }

                // Удаление пользователя из таблицы Employee
                string deleteUserQuery = "DELETE FROM Employee WHERE id = @UserId";
                using (SqlCommand command = new SqlCommand(deleteUserQuery, connection))
                {
                    command.Parameters.AddWithValue("@UserId", id);

                    // Выполнение команды удаления пользователя
                    command.ExecuteNonQuery();
                }

                connection.Close();
            }

            return new JsonResult("Deleted Successfully");
        }


     
    }
}
