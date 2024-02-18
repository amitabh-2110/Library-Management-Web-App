using BusinessObjectLayer.Data;
using BusinessObjectLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DataServices.UserDataService
{
    public class UserData: IUserData
    {
        private readonly ManageDb _context;

        public UserData(ManageDb context)
        {
            _context = context;
        }

        public async Task<string?> AuthenticateUser(string username)
        {
            var user = await _context.Users.FindAsync(username);

            if(user != null)
            {
                return user.Password;
            }

            return null;
        }

        public async Task<User> FetchUser(string username)
        {
            var user = await _context.Users.FindAsync(username);
            return user;
        }

        public async Task IncreaseCoin(string username)
        {
            var user = await _context.Users.FindAsync(username);
            
            if(user != null)
            {
                user.Coins += 1;
                await _context.SaveChangesAsync();
            }
        }

        public async Task DecreaseCoin(string username)
        {
            var user = await _context.Users.FindAsync(username);

            if(user != null)
            {
                user.Coins -= 1;
                await _context.SaveChangesAsync();
            }
        }

        public async Task BorrowBook(Booking booking)
        {
            await _context.Bookings.AddAsync(booking);
            await _context.SaveChangesAsync();
        }
    }
}
