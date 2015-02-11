namespace Logger
{
    using System;
    using System.IO;

    public class FileLogger:Logger
    {
        private string file;

        public FileLogger(string file = null)
        {
            this.File = file;
        }

        public string File
        {
            get
            {
                return file;
            }
            private set
            {
                if (value == null)
                {
                    //Random file for test purposes.
                    file = "";
                }
                else
                {
                    file = value;
                }
            }
        }


        public void Log(int level, string message)
        {
            string result = base.Log(level, message);

            using (System.IO.StreamWriter file = new System.IO.StreamWriter(this.File, true))
            {
                file.WriteLine(result);
            }
        }
    }
}
