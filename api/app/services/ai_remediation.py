def generate_ai_remediation(finding):

    title = finding.get("title", "")

    if "CVE" in title:

        return (
            "Upgrade vulnerable dependency to latest secure version. "
            "Apply patch management and dependency pinning."
        )

    if "secret" in title.lower():

        return (
            "Remove hardcoded secrets immediately and rotate credentials."
        )

    return (
        "Apply secure coding remediation and validate configurations."
    )
