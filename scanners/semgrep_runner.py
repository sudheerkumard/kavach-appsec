import subprocess
import json


def run_semgrep(target_path):
    try:
        result = subprocess.run(
            [
                "semgrep",
                "--config=auto",
                "--json",
                target_path
            ],
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="ignore"
        )

        if result.stdout:
            return json.loads(result.stdout)

        return {"results": []}

    except Exception:
        return {"results": []}
