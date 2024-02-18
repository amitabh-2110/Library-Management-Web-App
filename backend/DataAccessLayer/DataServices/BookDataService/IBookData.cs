using BusinessObjectLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DataServices.BookDataService
{
    public interface IBookData
    {
        public Task<List<Book>> FetchBooks();

        public Task<Book?> FetchBookById(Guid bookId);

        public Task<List<Booking>> FetchBorrowedBooks();

        public Task AddBook(Book book);
    }
}
