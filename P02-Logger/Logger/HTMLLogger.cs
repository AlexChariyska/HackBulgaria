namespace Logger
{
    using System;
    using System.IO;
    using System.Net;
    using System.Text;

    public class HTMLLogger : Logger
    {
        private string path;

        public HTMLLogger(string path = null)
        {
            this.Path = path;
        }

        public string Path
        {
            get
            {
                return path;
            }
            private set
            {
                if (value == null)
                {
                    //Random url for test purposes.
                    path = "http://www.novini.bg/";
                }
                else
                {
                    path = value;
                }
            }
        }

        public void Log(int level, string message)
        {
            string result = base.Log(level, message);

            var request = (HttpWebRequest)WebRequest.Create(this.Path);
            var data = Encoding.ASCII.GetBytes(result);

            request.Method = "POST";
            request.ContentType = "application/x-www-form-urlencoded";
            request.ContentLength = data.Length;

            using (var stream = request.GetRequestStream())
            {
                stream.Write(data, 0, data.Length);
            }

            var response = (HttpWebResponse)request.GetResponse();

            var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
            //Console.WriteLine(responseString);
        }
    }
}
