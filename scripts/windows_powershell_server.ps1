# Serve files from goodreads-odsc
#
# Right click this file and select "Run with PowerShell"
#
# If your user is not an administrator, you will need permission
# to serve files for a URL namespace.
#
# To grant permission, run Command prompt as an administrator and
# run `netsh http add urlacl url=http://+:8000/ user=domain\user`
# 
# To find your domain and username, run `whoami` in the Command prompt.
#

$server = New-Object Net.HttpListener
$server.Prefixes.Add("http://+:8000/")
$server.Start()

$root = [System.IO.Path]::GetFullPath((Join-Path $Pwd ".."))
Write-Output ("serving from " + $root)

While ($server.IsListening) {
  $context = $server.GetContext()
  $response = $context.Response
  Write-Output ($context.Request).RawUrl
  $path = Join-Path $root ($context.Request).RawUrl
  $buf = [Text.Encoding]::UTF8.GetBytes((GC $path))
  $response.ContentLength64 = $buf.Length
  $response.OutputStream.Write($buf, 0, $buf.Length)
  $response.Close()
}

$server.Stop()