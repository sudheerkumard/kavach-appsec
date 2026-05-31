import subprocess
import json


def run_gitleaks(target_path):
    result = subprocess.run(
        [
            "gitleaks",
            "detect",
            "--source",
            target_path,
            "--report-format",
            "json",
            "--no-git"
        ],
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="ignore"
    )

    print("GITLEAKS STDOUT:", result.stdout)
    print("GITLEAKS STDERR:", result.stderr)

    if result.stdout.strip():
        try:
            return json.loads(result.stdout)
        except:
            return []

    return []