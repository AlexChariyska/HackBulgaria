namespace Logger
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public abstract class Logger : ILogger
    {
        private string levelType;

        public virtual string Log(int level, string message)
        {

            switch (level)
            {
                case 1:
                    levelType = "INFO";
                    break;
                case 2:
                    levelType = "WARNING";
                    break;
                case 3:
                    levelType = "PLSCHECKFFS";
                    break;
                default: throw new ArgumentOutOfRangeException("Invalid argument: level!");
            }

            string date = DateTime.UtcNow.ToString("s", System.Globalization.CultureInfo.InvariantCulture);
            string result = levelType + "::" + date + "::" + message;
            return result;
        }
    }
}
