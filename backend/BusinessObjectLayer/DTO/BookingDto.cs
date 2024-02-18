using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjectLayer.DTO
{
    public class BookingDto
    {
        public string BookId { get; set; }

        public string Lender { get; set; }

        public string Borrower { get; set; }
    }
}
