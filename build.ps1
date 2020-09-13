# Build client
Write-Output "--------- Build client ------------------------------------"
Set-Location -Path './Client'
npm run-script build:production
if (!$?) {
    # last operation failed
    Write-Error 'Client app build finished in error.'
    exit 1;
}
Write-Output "--------- Build api ------------------------------------"
# Build api
Set-Location -Path '../OnlineNotes'
dotnet publish --configuration Release
if (!$?) {
    # last operation failed
    Write-Error 'api build finished in error.'
    exit 1;
}

Set-Location ..
# Clean .build
Remove-Item './.build/*' -Force -Recurse
# Copy packages to .build
Copy-Item -Path './Client/build/' -Destination './.build/client/' -Recurse
if (!$?) {
    # last operation failed
    Write-Error 'Failed to copy client package to build folder'
    exit 1;
}

Copy-Item -Path './keycloak-theme/' -Destination './.build/keycloak-theme' -Recurse

Copy-Item -Path './OnlineNotes/bin/Release/netcoreapp3.1/publish/' -Destination './.build/api/' -Recurse
if (!$?) {
    # last operation failed
    Write-Error 'Failed to copy api package to build folder'
    exit 1;
}

Write-Host "Build Succeeded" -ForegroundColor "green"
