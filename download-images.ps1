# Create images directory if it doesn't exist
$imageDir = "public/images/menu"
if (-not (Test-Path $imageDir)) {
    New-Item -ItemType Directory -Path $imageDir -Force
}

# Image URLs and their corresponding filenames
$images = @{
    "truffle-risotto.jpg" = "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80"
    "beef-carpaccio.jpg" = "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80"
    "chocolate-souffle.jpg" = "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80"
    "signature-martini.jpg" = "https://images.unsplash.com/photo-1575023782549-62ca0d244b39?auto=format&fit=crop&w=800&q=80"
    "seared-scallops.jpg" = "https://images.unsplash.com/photo-1632785322586-97f163025570?auto=format&fit=crop&w=800&q=80"
    "artisan-cheese-plate.jpg" = "https://images.unsplash.com/photo-1561756526-88c36ea52eb4?auto=format&fit=crop&w=800&q=80"
    "pan-seared-salmon.jpg" = "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=800&q=80"
    "caprese-salad.jpg" = "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=800&q=80"
    "tiramisu.jpg" = "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80"
    "craft-old-fashioned.jpg" = "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80"
    "grilled-octopus.jpg" = "https://images.unsplash.com/photo-1605209971703-56e3d140df01?auto=format&fit=crop&w=800&q=80"
    "classic-mojito.jpg" = "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80"
    "new-york-cheesecake.jpg" = "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80"
}

# Download each image
foreach ($image in $images.GetEnumerator()) {
    $outputPath = Join-Path $imageDir $image.Key
    Write-Host "Downloading $($image.Key)..."
    try {
        Invoke-WebRequest -Uri $image.Value -OutFile $outputPath
        Write-Host "Successfully downloaded $($image.Key)"
    } catch {
        Write-Host "Failed to download $($image.Key): $_"
    }
}

Write-Host "All images have been downloaded to $imageDir" 