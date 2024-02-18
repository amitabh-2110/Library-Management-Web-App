using BusinessLogicLayer.LogicServices.UserLogicService;
using BusinessObjectLayer.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Library_Management_System.Controllers
{
    [Route("api/[controller]"), Authorize]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserLogic _userLogic;

        public UserController(IUserLogic userLogic)
        {
            _userLogic = userLogic;
        }

        [HttpPost]
        [Route("add-book")]
        public async Task<IActionResult> AddBook(BookDto book)
        {
            try
            {
                await _userLogic.AddBook(book);

                return new JsonResult(new
                {
                    StatusCode = 200,
                    Message = "Book added successfully",
                });
            } catch (Exception ex)
            {
                return new JsonResult(new
                {
                    StatusCode = 500,
                    Message = $"Internal server error - {ex.Message}"
                });
            }
        }

        [HttpPost]
        [Route("borrow-book")]
        public async Task<IActionResult> BorrowBook(BookingDto booking)
        {
            try
            {
                await _userLogic.BorrowBook(booking);

                return new JsonResult(new
                {
                    StatusCode = 200,
                    Message = "Book borrowed successfully"
                });
            } catch(Exception ex)
            {
                return new JsonResult(new
                {
                    StatusCode = 500,
                    Message = $"Internal server error - {ex.Message}"
                });
            }
        }

        [HttpGet]
        [Route("fetch-added-books")]
        public async Task<IActionResult> FetchAddedBook(string username)
        {
            try
            {
                var books = await _userLogic.FetchAddedBooks(username);
                return new JsonResult(new
                {  
                    StatusCode = 200,
                    Message = "success",
                    Books = books
                });
            } catch(Exception ex) 
            {
                return new JsonResult(new
                {
                    StatusCode = 500,
                    Message = $"Internal server error - {ex.Message}"
                });
            }
        }

        [HttpGet]
        [Route("fetch-borrowed-books")]
        public async Task<IActionResult> FetchBorrowedBooks(string username)
        {
            try
            {
                var books = await _userLogic.FetchBorrowedBooks(username);
                return new JsonResult(new
                {
                    StatusCode = 200,
                    Message = "success",
                    Books = books
                });
            }
            catch (Exception ex)
            {
                return new JsonResult(new
                {
                    StatusCode = 500,
                    Message = $"Internal server error - {ex.Message}"
                });
            }
        }
    }
}
