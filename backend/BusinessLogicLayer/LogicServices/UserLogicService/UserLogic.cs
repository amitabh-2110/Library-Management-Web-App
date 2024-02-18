using BusinessObjectLayer.DTO;
using BusinessObjectLayer.Models;
using DataAccessLayer.DataServices.BookDataService;
using DataAccessLayer.DataServices.UserDataService;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.LogicServices.UserLogicService
{
    public class UserLogic: IUserLogic
    {
        private readonly IUserData _userData;
        private readonly IBookData _bookData;

        public UserLogic(IUserData userData, IBookData bookData)
        {
            _userData = userData;
            _bookData = bookData;
        }

        public async Task<bool> AuthenticateUser(string username, string password)
        {
            var pass = await _userData.AuthenticateUser(username);

            if(pass != null)
            {
                return password == pass;
            }

            return false;
        }

        public async Task<User> FetchUser(string username)
        {
            var user = await _userData.FetchUser(username);
            return user;
        }

        public async Task AddBook(BookDto book)
        {
            var newBook = new Book
            {
                BookId = Guid.NewGuid(),
                Name = book.BookName,
                Rating = 0,
                Author = book.Author,
                Genre = book.Genre,
                IsBookAvailable = true,
                Description = book.Description,
                AddedBy = book.Username
            };

            await _bookData.AddBook(newBook);
        }

        public async Task UpdateCoins(string lender, string borrower)
        {
            var borrow_user = await _userData.FetchUser(borrower);

            if(borrow_user == null || borrow_user.Coins == 0) 
            {
                throw new Exception("can't borrow books");
            }

            await _userData.IncreaseCoin(lender);
            await _userData.DecreaseCoin(borrower);
        }

        public async Task BorrowBook(BookingDto booking)
        {
            var newBooking = new Booking
            {
                BookingId = Guid.NewGuid(),
                BookId = new Guid(booking.BookId),
                Lender = booking.Lender,
                Borrower = booking.Borrower,
            };

            // update coins in user table
            await UpdateCoins(booking.Lender, booking.Borrower);
            await _userData.BorrowBook(newBooking);
        }

        public async Task<List<Book>> FetchAddedBooks(string username)
        {
            var books = await _bookData.FetchBooks();
            var reqBooks = books.Where(book => book.AddedBy == username).ToList();

            return reqBooks;
        }

        public async Task<List<Book>> FetchBorrowedBooks(string username)
        {
            var allBooks = await _bookData.FetchBooks();
            var allBorrowedBooks = await _bookData.FetchBorrowedBooks();
            var borrowedBooks = allBorrowedBooks.Where(borrowedBook => borrowedBook.Borrower == username).ToList();

            List<Book> reqBooks = new List<Book>();

            foreach (Booking borrowedBook in borrowedBooks)
            {
                foreach (Book book in allBooks)
                {
                    if (borrowedBook.BookId == book.BookId)
                    {
                        reqBooks.Add(book);
                    }
                }
            }

            return reqBooks;
        }
    }
}
