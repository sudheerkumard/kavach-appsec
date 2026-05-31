import subprocess
import json


def run_trivy(repo_path):
    try:
        result = subprocess.run(
            [
                "trivy",
                "fs",
                repo_path,
                "--scanners",
                "vuln",
                "--format",
                "json"
            ],
            capture_output=True,
            text=True,
            timeout=1800,
            encoding="utf-8",
            errors="ignore"
        )

        print("TRIVY STDOUT:")
        print(result.stdout)

        print("TRIVY STDERR:")
        print(result.stderr)

        if result.stdout:
            return json.loads(result.stdout)

        return {}

    except Exception as e:
        return {"error": str(e)}