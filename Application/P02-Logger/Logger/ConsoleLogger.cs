namespace Logger
{
    using System;

    public class ConsoleLogger : Logger
    {

        public void Log(int level, string message)
        {
            string result = base.Log(level, message);

            Console.WriteLine(result);
        }
    }
}
