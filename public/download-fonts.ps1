# Download Google Fonts used by the project and produce a local fonts CSS
# Usage: from project root run: powershell -ExecutionPolicy Bypass -File public\download-fonts.ps1

$fontsCssUrl = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;900&family=Playfair+Display:wght@600;700&display=swap"
$headers = @{ 'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }

Write-Host "Fetching fonts CSS from Google..."
$resp = Invoke-WebRequest -Uri $fontsCssUrl -Headers $headers -UseBasicParsing
$css = $resp.Content

# Create fonts folder
$fontsDir = Join-Path $PSScriptRoot 'assets\fonts'
if(-not (Test-Path $fontsDir)){
    New-Item -ItemType Directory -Path $fontsDir | Out-Null
}

# Find all remote font file urls and download them
$regex = 'url\((https://fonts.gstatic.com[^)]+)\)'
$fontMatches = [regex]::Matches($css,$regex)  # collect matches, do not output directly
$downloaded = @{}
foreach($m in $fontMatches){
    $url = $m.Groups[1].Value
    $fname = Split-Path $url -Leaf
    $out = Join-Path $fontsDir $fname
    if(-not (Test-Path $out)){
        Write-Host "Downloading $fname..."
        Invoke-WebRequest -Uri $url -OutFile $out -Headers $headers -UseBasicParsing
        Start-Sleep -Milliseconds 200
    } else {
        Write-Host "Already have $fname"
    }
    $downloaded[$url] = "/assets/fonts/$fname"
}

# Replace remote URLs in the CSS with local paths
$localCss = $css
foreach($k in $downloaded.Keys){
    $v = $downloaded[$k]
    $localCss = $localCss -replace [regex]::Escape($k), $v
}

# Write local CSS
$localCssPath = Join-Path $fontsDir 'fonts-local.css'
Write-Host "Writing local CSS to $localCssPath"
Set-Content -Path $localCssPath -Value $localCss -Encoding UTF8

Write-Host "Done. Fonts saved to: $fontsDir"
Write-Host "You can now run the app; the CSS imports /assets/fonts/fonts-local.css to load fonts locally."
