using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class UserDto
    {
        public String Username { get; set; }

        public String Token { get; set; }

        public string PhotoUrl { get; set; }
    }
}