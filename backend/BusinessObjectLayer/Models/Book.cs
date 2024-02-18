using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjectLayer.Models
{
    public class Book
    {
        public Guid BookId { get; set; }

        public string Name { get; set; }

        public int Rating { get; set; }

        public string Author { get; set; }

        public string Description { get; set; }

        public string Genre { get; set; }

        public bool IsBookAvailable { get; set; }

        public string AddedBy { get; set; }
    }
}
