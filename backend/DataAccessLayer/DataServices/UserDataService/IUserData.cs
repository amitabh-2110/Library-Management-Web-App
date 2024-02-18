using BusinessObjectLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DataServices.UserDataService
{
    public interface IUserData
    {
        public Task<string?> AuthenticateUser(string username);

        public Task<User> FetchUser(string username);

        public Task BorrowBook(Booking booking);

        public Task IncreaseCoin(string username);

        public Task DecreaseCoin(string username);
    }
}
