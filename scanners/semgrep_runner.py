import subprocess
import tempfile
import json
import git

def run_semgrep(repo_url):
    temp_dir = tempfile.mkdtemp()
    git.Repo.clone_from(repo_url, temp_dir)

    result = subprocess.run(
        ["semgrep", "--config=auto", "--json", temp_dir],
        capture_output=True,
        text=True
    )

    if result.stdout:
        data = json.loads(result.stdout)
        return data.get("results", [])

    return []