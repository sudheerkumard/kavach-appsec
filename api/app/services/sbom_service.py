import json
import subprocess


def generate_sbom(repo_path):

    output_file = f"{repo_path}/sbom.json"

    subprocess.run(
        [
            "trivy",
            "fs",
            "--format",
            "cyclonedx",
            "--output",
            output_file,
            repo_path,
        ],
        check=True
    )

    with open(output_file, "r") as f:
        return json.load(f)