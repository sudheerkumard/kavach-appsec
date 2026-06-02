import subprocess
import json
import os
import sys


def run_checkov(repo_path):
    checkov_cmd = os.path.join(
        os.path.dirname(sys.executable),
        "checkov.cmd"
    )

    result = subprocess.run(
        [
            checkov_cmd,
            "-d",
            repo_path,
            "--output",
            "json"
        ],
        capture_output=True,
        text=True,
        timeout=900,
        shell=True
    )

    print("CHECKOV STDOUT:", result.stdout)
    print("CHECKOV STDERR:", result.stderr)

    if result.stdout.strip():
        try:
            return json.loads(result.stdout)
        except Exception:
            return {}

    return {}
