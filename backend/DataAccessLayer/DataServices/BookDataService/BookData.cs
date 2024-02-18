using BusinessObjectLayer.Data;
using BusinessObjectLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DataServices.BookDataService
{
    public class BookData: IBookData
    {
        private readonly ManageDb _context;

        public BookData(ManageDb context)
        {
            _context = context;
        }

        public async Task<List<Book>> FetchBooks()
        {
            var books = await _context.Books.ToListAsync();
            return books;
        }

        public async Task<Book?> FetchBookById(Guid bookId)
        {
            var book = await _context.Books.FindAsync(bookId);
            return book;
        }

        public async Task<List<Booking>> FetchBorrowedBooks()
        {
            var bookings = await _context.Bookings.ToListAsync();
            return bookings;
        }

        public async Task AddBook(Book book)
        {
            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
        }
    }
}
