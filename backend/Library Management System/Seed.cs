using BusinessObjectLayer.Data;
using BusinessObjectLayer.Models;

namespace Library_Management_System
{
    public class Seed
    {
        private readonly ManageDb _context;

        public Seed(ManageDb context)
        {
            _context = context;
        }

        public void SeedDataContext()
        {
            if(!_context.Users.Any())
            {
                User user1 = new User
                {
                    Username = "anurag_112@gmail.com",
                    Name = "Anurag",
                    Coins = 5,
                    Password = "@a1234"
                };

                User user2 = new User
                {
                    Username = "amitabh_311@gmail.com",
                    Name = "Kumar Amitabh",
                    Coins = 5,
                    Password = "@b1234"
                };

                User user3 = new User
                {
                    Username = "anuj_539@gmail.com",
                    Name = "Anuj",
                    Coins = 5,
                    Password = "@c1234"
                };

                User user4 = new User
                {
                    Username = "aman_123@gmail.com",
                    Name = "Aman",
                    Coins = 5,
                    Password = "@d1234"
                };

                _context.Users.Add(user1);
                _context.Users.Add(user2);
                _context.Users.Add(user3);
                _context.Users.Add(user4);
                _context.SaveChanges();
            }

            if(!_context.Books.Any())
            {
                Book book1 = new Book
                {
                    BookId = Guid.NewGuid(),
                    Name = "Tensorflow For Machine Intelligence",
                    Author = "Sam Abrahams",
                    Genre = "Machine Learning",
                    Description = "This book is primarily focused on the TensorFlow API. This TensorFlow book introduces the framework and the underlying machine learning concepts that are important to harness machine intelligence.",
                    IsBookAvailable = true,
                    Rating = 3,
                    AddedBy = "anurag_112@gmail.com"
                };

                Book book2 = new Book 
                {
                    BookId = Guid.NewGuid(),
                    Name = "Graph Theory",
                    Author = "Narsingh Deo",
                    Genre = "Computer Science",
                    Description = "This outstanding introductory treatment of graph theory and its applications has had a long life in the instruction of advanced undergraduates and graduate students in all areas that require knowledge of this subject.",
                    IsBookAvailable = true,
                    Rating = 4,
                    AddedBy = "anuj_539@gmail.com"
                };

                Book book3 = new Book 
                { 
                    BookId = Guid.NewGuid(), 
                    Name = "Computer Networking",
                    Author = "Kurose",
                    Genre = "Computer Science",
                    Description = "Focusing on the Internet and the fundamentally important issues of networking, this text provides an excellent foundation for students in computer science and electrical engineering, without requiring extensive knowledge of programming or mathematics.",
                    IsBookAvailable = true,
                    Rating = 5,
                    AddedBy = "amitabh_311@gmail.com"
                };

                Book book4 = new Book
                {
                    BookId= Guid.NewGuid(),
                    Name = "Software Engineering",
                    Author = "Teofilo Gonzalez",
                    Genre = "Computer Science and Software engineering",
                    Description = "The first volume of this popular handbook mirrors the modern taxonomy of computer science and software engineering as described by the Association for Computing Machinery (ACM) and the IEEE Computer Society (IEEE-CS).",
                    IsBookAvailable = true,
                    Rating = 3,
                    AddedBy = "aman_123@gmail.com"
                };

                _context.Books.Add(book1);
                _context.Books.Add(book2);
                _context.Books.Add(book3);
                _context.Books.Add(book4);
                _context.SaveChanges();
            }
        }
    }
}
