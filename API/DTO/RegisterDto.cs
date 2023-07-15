using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class RegisterDto
    {
        [Required]
        public string Username {get;set;}

        [Required]
        [RegularExpression(@"^(?=.*[a-zA-Z])(?=.*\d|.*[\W_]).{8,}$", ErrorMessage = "Password should be at least 8 digits.")]
        
        public string Password{get;set;}
    }
}