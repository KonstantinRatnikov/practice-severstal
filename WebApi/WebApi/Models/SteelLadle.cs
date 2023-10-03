namespace WebApi.Models
{
    public class SteelLadle
    {
        public int id { get; set; }
        public int max_cup { get; set; }
        public int max_plate { get; set; }
        public int max_collector { get; set; }
        public int cup { get; set; }
        public int plate { get; set; }
        public int collector { get; set; }
        public string state { get; set; }
        public string weight { get; set; }
        public string characteristic { get; set; }
        public string start_time { get; set; }
        public int durability { get; set; }
        public int blocks { get; set; }
        public string ladle_washing { get; set; }
        public string shutter_installation { get; set; }
        public string hole_filling { get; set; }
        public int melt_id { get; set; } = 0;
        public string steel_grade { get; set; }
        public int UNRS_id { get; set; } = 0;
    }
}
