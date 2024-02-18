using BusinessLogicLayer.LogicServices.BookLogicService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Library_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookLogic _bookLogic;

        public BookController(IBookLogic bookLogic)
        {
            _bookLogic = bookLogic;
        }

        [HttpGet, AllowAnonymous]
        [Route("fetch-books")]
        public async Task<IActionResult> FetchAllBooks()
        {
            var books = await _bookLogic.FetchBooks();

            return new JsonResult(new
            {
                StatusCode = 200,
                Message = "success",
                Books = books
            });
        }

        [HttpGet, AllowAnonymous]
        [Route("fetch-book")]
        public async Task<IActionResult> FetchBook(string bookId)
        {
            try
            {
                var book = await _bookLogic.FetchBook(bookId);

                if(book == null)
                {
                    return new JsonResult(new
                    {
                        StatusCode = 400,
                        Message = "Book not found"
                    });
                }

                return new JsonResult(new
                {
                    StatusCode = 200,
                    Message = "success",
                    Book = book
                });

            } catch (Exception ex)
            {
                return new JsonResult($"{ex.Message}");
            }
        }

        [HttpGet, AllowAnonymous]
        [Route("fetch-filtered-books")]
        public async Task<IActionResult> FetchFilteredBooks(string? searchText, string rating)
        {
            var books = await _bookLogic.FetchFilterBooks(searchText ?? "", rating);

            return new JsonResult(new
            {
                StatusCode = 200,
                Message = "success",
                Books = books
            });
        }
    }
}
