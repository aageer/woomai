# Railway Configuration

## Root Directory Setting
Make sure in Railway Dashboard → Settings → Root Directory is set to: `PromptEngineering`

## Start Command
If auto-detection fails, manually set:
`gunicorn app:app --bind 0.0.0.0:$PORT --workers 2 --timeout 120`
