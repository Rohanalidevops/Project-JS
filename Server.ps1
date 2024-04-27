$Port = 8000  # You can use any port you like
$Root = Get-Location
Write-Host "Serving HTTP on http://localhost:$Port from $Root"
Add-Type @"
using System;
using System.IO;
using System.Net;
public class SimpleHttpServer {
    private HttpListener listener;
    private string baseFolder;
    public SimpleHttpServer(string prefix, string baseFolder) {
        this.baseFolder = baseFolder;
        listener = new HttpListener();
        listener.Prefixes.Add(prefix);
        listener.Start();
    }
    public void Start() {
        while (true) {
            HttpListenerContext context = listener.GetContext();
            string url = context.Request.Url.LocalPath;
            string path = Path.Combine(baseFolder, url.TrimStart('/'));
            if (File.Exists(path)) {
                byte[] data = File.ReadAllBytes(path);
                context.Response.OutputStream.Write(data, 0, data.Length);
                context.Response.ContentType = "application/octet-stream";
            } else {
                context.Response.StatusCode = 404;
            }
            context.Response.Close();
        }
    }
}
"@
$server = New-Object SimpleHttpServer "http://localhost:$Port/", "$Root"
$server.Start()
