using BusinessObjectLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.LogicServices.BookLogicService
{
    public interface IBookLogic
    {
        public Task<List<Book>> FetchBooks();

        public Task<Book?> FetchBook(string bookId);

        public Task<List<Book>> FetchFilterBooks(string searchText, string rat);
    }
}
