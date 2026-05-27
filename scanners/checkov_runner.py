import subprocess
import tempfile
import json
import git

def run_checkov(repo_url):
    temp_dir = tempfile.mkdtemp()
    git.Repo.clone_from(repo_url, temp_dir)

    result = subprocess.run(
        ["checkov", "-d", temp_dir, "-o", "json"],
        capture_output=True,
        text=True
    )

    if result.stdout:
        return json.loads(result.stdout)

    return []