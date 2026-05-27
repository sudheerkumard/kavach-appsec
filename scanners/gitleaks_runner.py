import subprocess
import tempfile
import json
import git

def run_gitleaks(repo_url):
    temp_dir = tempfile.mkdtemp()
    git.Repo.clone_from(repo_url, temp_dir)

    result = subprocess.run(
        [
            "gitleaks",
            "detect",
            "--source",
            temp_dir,
            "--report-format",
            "json"
        ],
        capture_output=True,
        text=True
    )

    if result.stdout:
        return json.loads(result.stdout)

    return []