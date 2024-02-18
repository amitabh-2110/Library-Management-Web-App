using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjectLayer.Models
{
    public class Booking
    {
        public Guid BookingId { get; set; }

        public Guid BookId { get; set; }

        public string Lender { get; set; }

        public string Borrower { get; set; }
    }
}
