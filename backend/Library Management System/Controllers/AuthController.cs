using BusinessLogicLayer.LogicServices.TokenLogicService;
using BusinessLogicLayer.LogicServices.UserLogicService;
using BusinessObjectLayer.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Library_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ITokenLogic _tokenLogic;
        private readonly IUserLogic _userLogic;

        public AuthController(ITokenLogic tokenLogic, IUserLogic userLogic)
        {
            _tokenLogic = tokenLogic;
            _userLogic = userLogic;
        }

        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] UserDto user)
        {
            var authUser = await _userLogic.AuthenticateUser(user.Username, user.Password);

            if(!authUser)
            {
                return new JsonResult(new
                {
                    StatusCode = 400,
                    Message = "Wrong credentials"
                });
            }

            string role = "user";
            var token = _tokenLogic.CreateToken(user.Username, role);

            return new JsonResult(new
            {
                StatusCode = 200,
                Message = "Logged in successfully",
                Token = token
            });
        }

        [HttpGet, Authorize]
        public async Task<IActionResult> FetchUser()
        {
            string userId = User.FindFirstValue(ClaimTypes.Email);
            var user = await _userLogic.FetchUser(userId);

            return new JsonResult(new
            {
                user.Name,
                user.Username,
                user.Coins,
                Message = "success",
                StatusCode = 200
            });
        }
    }
}
