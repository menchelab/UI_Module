$host.ui.RawUI.WindowTitle = 'UI_Server'
$host.UI.RawUI.BackgroundColor='darkblue'
Clear-Host
venv\Scripts\activate
$env:FLASK_ENV="development"
$env:FLASK_APP="json_io.py"
flask run