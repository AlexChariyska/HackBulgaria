namespace Logger
{
    using System;

    class MainProgram
    {
        static void Main()
        {
            var consoleTest = new ConsoleLogger();
            consoleTest.Log(2, "Hello!");

            //If you want to enter a specific path to file for the reguest you can pass it as a parameter in the constructor.Example:
            //var fileTestWithParam = new FileLogger(@"C:\Users\Public\TestFolder\test.txt");
            //fileTestWithParam.Log(1, "Hello!");

            var fileTest = new FileLogger();
            fileTest.Log(1, "Hello!");

            //If you want to enter a specific url for the reguest you can pass it as a parameter in the constructor.Example:
            //var htmlPostLogWithParam = new HTMLLogger("http://www.novini.bg/");
            //htmlPostLogWithParam.Log(1, "Hello!");

            var htmlPostLog = new HTMLLogger();
            htmlPostLog.Log(1, "Hello!");
        }
    }
}
