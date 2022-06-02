del "Avito filter_firefox.zip" /Q
cd "Avito filter"
del manifest.json
copy "..\manifest_v2.json" .\manifest.json
"C:\Program Files\7-Zip\7z.exe" a -r "Avito filter_firefox.zip"
move "Avito filter_firefox.zip" ..

del "Avito filter_chrome.zip" /Q
cd "Avito filter"
del manifest.json
copy "..\manifest_v3.json" .\manifest.json
"C:\Program Files\7-Zip\7z.exe" a -r "Avito filter_chrome.zip"
move "Avito filter_chrome.zip" ..