using BusinessObjectLayer.Models;
using DataAccessLayer.DataServices.BookDataService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.LogicServices.BookLogicService
{
    public class BookLogic: IBookLogic
    {
        private readonly IBookData _bookData;

        public BookLogic(IBookData bookData)
        {
            _bookData = bookData;
        }

        public async Task<List<Book>> FetchBooks()
        {
            var books = await _bookData.FetchBooks();
            return books;
        }

        public async Task<Book?> FetchBook(string bookId)
        {
            var book = await _bookData.FetchBookById(new Guid(bookId));
            return book;
        }

        public async Task<List<Book>> FetchFilterBooks(string searchText, string rat)
        {
            int rating = int.Parse(rat);
            string search = searchText.ToLower();

            var allBooks = await _bookData.FetchBooks();
            var reqBooks = allBooks
                .Where(book => (rating == -1 || book.Rating == rating) && (book.Name.ToLower().Contains(search) || book.Author.ToLower().Contains(search)))
                .ToList();

            return reqBooks;
        }
    }
}
