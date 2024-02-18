using BusinessObjectLayer.DTO;
using BusinessObjectLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.LogicServices.UserLogicService
{
    public interface IUserLogic
    {
        public Task<bool> AuthenticateUser(string username, string password);

        public Task<User> FetchUser(string username);

        public Task AddBook(BookDto book);

        public Task BorrowBook(BookingDto booking);

        public Task<List<Book>> FetchAddedBooks(string username);

        public Task<List<Book>> FetchBorrowedBooks(string username);
    }
}
