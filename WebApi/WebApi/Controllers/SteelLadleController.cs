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
    public class SteelLadleController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public SteelLadleController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT
    sl.id,
    ISNULL(m.melt_id, 0) as melt_id,
    ISNULL(m.steel_grade, '') as steel_grade,
    ISNULL(unrs.UNRS_id, 0) as UNRS_id,
    ISNULL(max_cup, 0) as max_cup,
    ISNULL(max_plate, 0) as max_plate,
    ISNULL(max_collector, 0) as max_collector,
    ISNULL(cup, 0) as cup,
    ISNULL(plate, 0) as plate,
    ISNULL(collector, 0) as collector,
    ISNULL(state, '') as state,
    ISNULL(weight, '') as weight,
    ISNULL(characteristic, '') as characteristic,
    sl.start_time,
    ISNULL(durability, 0) as durability,
    ISNULL(blocks, 0) as blocks,
    ISNULL(ladle_washing, '') as ladle_washing,
    ISNULL(shutter_installation, '') as shutter_installation,
    ISNULL(hole_filling, '') as hole_filling
FROM
    dbo.SteelLadle sl
    LEFT JOIN dbo.Melt m ON sl.id = m.ladle_id
    LEFT JOIN dbo.WorkshopUNRS unrs ON m.melt_id = unrs.melt_id";
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

        [HttpPut]
        public JsonResult Put(SteelLadle steelLadle)
        {

            string query = @"
                BEGIN TRANSACTION;
                UPDATE dbo.SteelLadle SET
                max_cup = " + steelLadle.max_cup + @",
                max_plate = " + steelLadle.max_plate + @",
                max_collector = " + steelLadle.max_collector + @",
                cup = " + steelLadle.cup + @",
                plate = " + steelLadle.plate + @",
                collector = " + steelLadle.collector + @",
                state = '" + steelLadle.state + @"',
                weight = '" + steelLadle.weight + @"',
                characteristic = '" + steelLadle.characteristic + @"',
                start_time = '" + DateTime.Now.ToString() + @"',
                durability = " + steelLadle.durability + @",
                blocks = " + steelLadle.blocks + @",
                ladle_washing = '" + steelLadle.ladle_washing + @"',
                shutter_installation = '" + steelLadle.shutter_installation + @"',
                hole_filling = '" + steelLadle.hole_filling + @"'
                WHERE id = " + steelLadle.id + @";

                INSERT INTO dbo.SteelLadleHistory (
                        id_steelLadle, melt_id, UNRS_id, steel_grade, max_cup, max_plate, max_collector, cup,
                        plate, collector, state, weight, characteristic, start_time, durability, blocks,
                        ladle_washing, shutter_installation, hole_filling
                    )
                    VALUES (
                        " + steelLadle.id + @", 
                        " + steelLadle.melt_id + @", 
                        " + steelLadle.UNRS_id + @", 
                        '" + steelLadle.steel_grade + @"',
                        " + steelLadle.max_cup + @",
                        " + steelLadle.max_plate + @",
                        " + steelLadle.max_collector + @",
                        " + steelLadle.cup + @",
                        " + steelLadle.plate + @",
                        " + steelLadle.collector + @",
                        '" + steelLadle.state + @"',
                        '" + steelLadle.weight + @"',
                        '" + steelLadle.characteristic + @"',
                        '" + DateTime.Now.ToString() + @"',
                        " + steelLadle.durability + @",
                        " + steelLadle.blocks + @",
                        '" + steelLadle.ladle_washing + @"',
                        '" + steelLadle.shutter_installation + @"',
                        '" + steelLadle.hole_filling + @"'
                    );
            COMMIT;

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
    }
}
